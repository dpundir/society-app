module.exports = function (Member) {

    var moment = require('moment');

    Member.memberTransaction = function (req, cb) {
        var TransactionHistory = req.app.models.TransactionHistory;
        Member.beginTransaction({isolationLevel: Member.Transaction.READ_COMMITTED}, function (err, tx) {
            var memberid = req.body.memberId;
            var deposit = req.body.depositAmount;

            TransactionHistory.create(req.body, {transaction: tx}, function (err1, data1) {
                if (err1) {
                    tx.rollback();
                    cb(err1, null);
                }
                Member.findById(memberid, {transaction: tx}, function (err2, data2) {
                    if (err2) {
                        tx.rollback();
                        cb(err2, null);
                    }
                    var updatedDeposit = data2.deposit + deposit;
                    Member.update({id: memberid}, {deposit: updatedDeposit}, {transaction: tx}, function (err3, data3) {
                        if (err3) {
                            tx.rollback();
                            cb(err3, null);
                        }
                        tx.commit();
                        cb(null, {
                            deposit: updatedDeposit
                        });
                    });
                });
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
                personData.addressid = data1.id;
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
        Member.beginTransaction({isolationLevel: Member.Transaction.READ_COMMITTED}, function (err, tx) {
            var addressData = req.body.nominee.address;
            addressData.id = '';

            Address.create(addressData, {transaction: tx}, function (err1, data1) {
                if (err1) {
                    tx.rollback();
                    cb(err1, null);
                }
                var personData = req.body.nominee;
                personData.id = '';
                personData.addressid = data1.id;
                personData.createDate = new Date();
                personData.modifiedDate = new Date();
                delete personData.address;
                Person.create(personData, {transaction: tx}, function (err2, data2) {
                    if (err2) {
                        tx.rollback();
                        cb(err2, null);
                    }
                    var memberData = {};
                    var memberId = req.body.id;
                    memberData.nomineeId = data2.id;
                    memberData.modifiedDate = new Date();
                    delete memberData.nominee;
                    //delete memberData.person;
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
        Member.beginTransaction({isolationLevel: Member.Transaction.READ_COMMITTED}, function (err, tx) {
            var addressData = req.body.nominee.address;
            var addressId = req.body.nominee.address.id;
            delete addressData.id;

            Address.update({id: addressId}, addressData, {transaction: tx}, function (err1, data1) {
                if (err1) {
                    tx.rollback();
                    cb(err1, null);
                }
                var personData = req.body.nominee;
                var personId = req.body.nominee.id;
                personData.modifiedDate = new Date();
                delete personData.address;
                delete personData.id;
                Person.update({id: personId}, personData, {transaction: tx}, function (err2, data2) {
                    if (err2) {
                        tx.rollback();
                        cb(err2, null);
                    }
                    var memberData = {};
                    var memberId = req.body.id;
                    memberData.modifiedDate = new Date();
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
