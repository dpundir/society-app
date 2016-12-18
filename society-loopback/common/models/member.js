module.exports = function (Member) {

    var moment = require('moment');

    Member.memberTransaction = function (req, cb) {
        var TransactionHistory = req.app.models.TransactionHistory;
		var Loan = req.app.models.Loan;
		var MemberDeposit = req.app.models.MemberDeposit;
        Member.beginTransaction({isolationLevel: Member.Transaction.READ_COMMITTED}, function (err, tx) {
            var memberid = req.body.memberId;
			var depositId = req.body.depositId;
            var depositAmount = req.body.depositAmount;
			var interestAmount = req.body.interestAmount;
			var depositType = req.body.type;
			var updateAmount;

			delete req.body.depositId;

            TransactionHistory.create(req.body, {transaction: tx}, function (err1, data1) {
                if (err1) {
                    tx.rollback();
                    cb(err1, null);
                }
				if(depositType == 1 || depositType == 3 || depositType == 4 || depositType == 5) {
					MemberDeposit.findById(depositId, {transaction: tx}, function(err2, data2) {
						if (err2) {
							tx.rollback();
							cb(err2, null);
						}
						if(depositType == 1){
							updateAmount = {deposit: data2.deposit + depositAmount};
						} else if(depositType == 3){
							updateAmount = {shareValue: data2.shareValue + depositAmount};
						} else if(depositType == 4) {
							updateAmount = {kalyanFund: data2.kalyanFund + depositAmount};
						} else if(depositType == 5) {
							updateAmount = {buildingFund: data2.buildingFund + depositAmount};
						}

						MemberDeposit.update({id: depositId}, updateAmount, {transaction: tx}, function(err3, count) {
							if (err3) {
								tx.rollback();
								cb(err3, null);
							}
							tx.commit();
							cb(null, {
								transactionId: data1.id,
								deposit: updateAmount
							});
						});
					});
				} else if(depositType == 2){
					var loanId = req.body.loanId;
					Loan.findById(loanId, {transaction: tx}, function(err2, data2) {
						if (err2) {
							tx.rollback();
							cb(err2, null);
						}
						var principalPaid = data2.amountPaid + depositAmount;
						var interestPaid = data2.interestPaid + interestAmount;
						Loan.update({id: loanId}, {amountPaid: principalPaid, interestPaid: interestPaid}, {transaction: tx}, function(err3, data3) {
							if (err3) {
								tx.rollback();
								cb(err3, null);
							}
							tx.commit();
							cb(null, {
								transactionId: data1.id,
								deposit: {
									loanDetails: {
										amountPaid: principalPaid,
										interestPaid: interestPaid
									}
								}
							});
						});
					});
				}
            });
        })
    };

    Member.applyInterest = function (req, cb) {
        var TransactionHistory = req.app.models.TransactionHistory;
        Member.beginTransaction(function (err, tx) {
            var memberid = req.body.member_id;

            var startDate = moment().startOf('month').toDate();
            var middleDate = moment().startOf('month').add(14, 'days').toDate();

            TransactionHistory.find({where: {member_id: memberid, create_date: {between: [startDate, middleDate]}, type: 1}}, {transaction: tx}, function (err1, data1) {
                if (err1) {
                    cb(err1, null);
                }
                var deposit = 0;
                for (var i = 0; i < data1.length; i++) {
                    deposit += data[i].deposit_amount;
                }
                //To-Do: fetch from society-config
                var rateOfInterest = 0.06;
                Member.findById(memberid, {transaction: tx}, function (err2, data2) {
                    if (err2) {
                        cb(err2, null);
                    }
                    Member.update({id: memberid}, {deposit: data2.deposit + deposit}, {transaction: tx}, function (err3, data3) {
                        if (err3) {
                            cb(err3, null);
                        }
                        tx.commit();
                    });
                });
            });
        })
    };


    Member.createPersonAddress = function (req, cb) {
        var Person = req.app.models.Person;
        var Address = req.app.models.Address;
        Member.beginTransaction({isolationLevel: Member.Transaction.READ_COMMITTED}, function (err, tx) {
            var addressData = req.body.person.address;
            addressData.id = '';

            Address.create(addressData, {transaction: tx}, function (err1, data1) {
                if (err1) {
                    tx.rollback();
                    cb(err1, null);
                }
                var personData = req.body.person;
                personData.id = '';
                personData.addressId = data1.id;
				personData.permanentAddressId = data1.id;
                personData.createDate = new Date();
                personData.modifiedDate = new Date();
                delete personData.address;
                Person.create(personData, {transaction: tx}, function (err2, data2) {
                    if (err2) {
                        tx.rollback();
                        cb(err2, null);
                    }
                    var memberData = req.body;
                    memberData.personId = data2.id;
                    memberData.id = '';
                    memberData.createDate = new Date();
                    memberData.modifiedDate = new Date();
                    delete memberData.person;
                    Member.create(memberData, {transaction: tx}, function (err3, data3) {
                        if (err3) {
                            tx.rollback();
                            cb(err3, null);
                        }
                        tx.commit();
                        cb(null, data3);
                    });
                });
            });
        })
    };

    Member.createNominationPersonAddress = function (req, cb) {
        var Person = req.app.models.Person;
        var Address = req.app.models.Address;
        var MemberNominee = req.app.models.MemberNominee;

        Member.beginTransaction({isolationLevel: Member.Transaction.READ_COMMITTED}, function (err, tx) {
            var nomineeData = req.body.memberNominee[0].nominee;
            var addressData = nomineeData.address;
            addressData.id = '';

            var existingPersonId = nomineeData.id;

            if(!existingPersonId) {
                Address.create(addressData, {transaction: tx}, function (err1, data1) {
                    if (err1) {
                        tx.rollback();
                        cb(err1, null);
                    }
                    nomineeData.id = '';
                    nomineeData.addressId = data1.id;
					nomineeData.permanentAddressId = data1.id;
                    nomineeData.createDate = new Date();
                    nomineeData.modifiedDate = new Date();
                    delete nomineeData.address;
                    Person.create(nomineeData, {transaction: tx}, function (err2, data2) {
                        if (err2) {
                            tx.rollback();
                            cb(err2, null);
                        }
                        var memberNomineeData = { id: ''};
                        memberNomineeData.memberId = req.body.memberNominee[0].memberId;
                        memberNomineeData.nomineeId = data2.id;
                        memberNomineeData.relation = req.body.memberNominee[0].relation;
                        MemberNominee.create(memberNomineeData, {transaction: tx}, function(err3, data3){
                            if (err3) {
                                tx.rollback();
                                cb(err3, null);
                            }
                            tx.commit();
                            cb(null, data3);
                        });
                    });
                });
            } else{
                var memberNomineeData = { id: ''};
                memberNomineeData.memberId = req.body.memberNominee[0].memberId;
                memberNomineeData.nomineeId = existingPersonId;
                memberNomineeData.relation = req.body.memberNominee[0].relation;
                MemberNominee.create(memberNomineeData, {transaction: tx}, function(err3, data3){
                    if (err3) {
                        tx.rollback();
                        cb(err3, null);
                    }
                    tx.commit();
                    cb(null, data3);
                });
            }
        })
    };

    Member.updatePersonAddress = function (req, cb) {
        var Person = req.app.models.Person;
        var Address = req.app.models.Address;
        Member.beginTransaction({isolationLevel: Member.Transaction.READ_COMMITTED}, function (err, tx) {
            var addressData = req.body.person.address;
            var addressId = req.body.person.address.id;
            delete addressData.id;

            Address.update({id: addressId}, addressData, {transaction: tx}, function (err1, data1) {
                if (err1) {
                    tx.rollback();
                    cb(err1, null);
                }
                var personData = req.body.person;
                var personId = req.body.person.id;
                personData.modifiedDate = new Date();
                delete personData.address;
                delete personData.id;
                Person.update({id: personId}, personData, {transaction: tx}, function (err2, data2) {
                    if (err2) {
                        tx.rollback();
                        cb(err2, null);
                    }
                    var memberData = req.body;
                    var memberId = req.body.id;
                    memberData.modifiedDate = new Date();
                    delete memberData.person;
                    delete memberData.id;
                    Member.update({id: memberId}, memberData, {transaction: tx}, function (err3, data3) {
                        if (err3) {
                            tx.rollback();
                            cb(err3, null);
                        }
                        tx.commit();
                        cb(null, data3);
                    });
                });
            });
        })
    };

    Member.updateNominationPersonAddress = function (req, cb) {
        var Person = req.app.models.Person;
        var Address = req.app.models.Address;
        var MemberNominee = req.app.models.MemberNominee;

        Member.beginTransaction({isolationLevel: Member.Transaction.READ_COMMITTED}, function (err, tx) {
            var nomineeData = req.body.memberNominee[0].nominee;
            var addressData = nomineeData.address;
            var addressId = nomineeData.address.id;
            delete addressData.id;

            Address.update({id: addressId}, addressData, {transaction: tx}, function (err1, data1) {
                if (err1) {
                    tx.rollback();
                    cb(err1, null);
                }
                var personId = nomineeData.id;
                nomineeData.modifiedDate = new Date();
                delete nomineeData.address;
                delete nomineeData.id;
                Person.update({id: personId}, nomineeData, {transaction: tx}, function (err2, data2) {
                    if (err2) {
                        tx.rollback();
                        cb(err2, null);
                    }
                    var memberNominee = req.body.memberNominee[0];
                    var memberNomineeId = memberNominee.id;
                    delete memberNominee.nominee;
                    delete memberNominee.id;
                    MemberNominee.update({id: memberNomineeId}, memberNominee, {transaction: tx}, function (err3, data3) {
                        if (err3) {
                            tx.rollback();
                            cb(err3, null);
                        }
                        tx.commit();
                        cb(null, data3);
                    });
                });
            });
        })
    };

    Member.remoteMethod(
        'createPersonAddress',
        {
            description: 'Add member with person and address details.',
            accepts: [
                {arg: 'req', type: 'object', http: {source: 'req'},
                    description: 'Do not supply this argument, it is automatically extracted ' +
                        'from request headers.'
                }
            ],
            returns: {
                arg: 'member', type: 'object',
                description: 'The response body contains properties of the Member'
            },
            http: {verb: 'post', path: '/person'}
        }
    );

    Member.remoteMethod(
        'createNominationPersonAddress',
        {
            description: 'Add nominee with person and address details.',
            accepts: [
                {arg: 'req', type: 'object', http: {source: 'req'},
                    description: 'Do not supply this argument, it is automatically extracted ' +
                        'from request headers.'
                }
            ],
            returns: {
                arg: 'member', type: 'object',
                description: 'The response body contains properties of the Member'
            },
            http: {verb: 'post', path: '/nominee'}
        }
    );

    Member.remoteMethod(
        'updateNominationPersonAddress',
        {
            description: 'Update member with person and address details.',
            accepts: [
                {arg: 'req', type: 'object', http: {source: 'req'},
                    description: 'Do not supply this argument, it is automatically extracted ' +
                        'from request headers.'
                }
            ],
            returns: {
                arg: 'member', type: 'object',
                description: 'The response body contains properties of the Member'
            },
            http: {verb: 'put', path: '/nominee'}
        }
    );

    Member.remoteMethod(
        'updatePersonAddress',
        {
            description: 'Update member with person and address details.',
            accepts: [
                {arg: 'req', type: 'object', http: {source: 'req'},
                    description: 'Do not supply this argument, it is automatically extracted ' +
                        'from request headers.'
                }
            ],
            returns: {
                arg: 'member', type: 'object',
                description: 'The response body contains properties of the Member'
            },
            http: {verb: 'put', path: '/person'}
        }
    );

    Member.remoteMethod(
        'memberTransaction',
        {
            description: 'Add member transaction history and update deposit passed member.',
            accepts: [
                {arg: 'req', type: 'object', http: {source: 'req'},
                    description: 'Do not supply this argument, it is automatically extracted ' +
                        'from request headers.'
                }
            ],
            returns: {
                arg: 'transaction', type: 'object',
                description: 'The response body contains properties of the Transaction History'
            },
            http: {verb: 'post', path: '/transaction'}
        }
    );
};
