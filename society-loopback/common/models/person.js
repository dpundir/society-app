module.exports = function (Person) {

  Person.memberCreateTransaction = function (req, cb) {
    var Member = req.app.models.Member;
    var Address = req.app.models.Address;
    Person.beginTransaction({isolationLevel: Person.Transaction.READ_COMMITTED}, function (err, tx) {
      var addressData = req.body.address;

      Address.create(addressData, {transaction: tx}, function (err1, data1) {
        if (err1) {
          tx.rollback();
          cb(err1, null);
        }
        var personData = req.body;
        delete personData.addressId;
        personData.createDate = new Date();
        personData.modifiedDate = new Date();
        Person.create(personData, {transaction: tx}, function (err2, data2) {
          if (err2) {
            tx.rollback();
            cb(err2, null);
          }
          var memberData = {
            'create_date': new Date(),
            'modified_date': new Date(),
            'status': personData.status,
            'person_id': data2
          };
          Member.create(memberData, {transaction: tx}, function (err3, data3) {
            if (err3) {
              tx.rollback();
              cb(err3, null);
            }
            tx.commit();
            cb(null, {
              id: data3.id
            });
          });
        });
      });
    })
  };

  Person.memberUpdateTransaction = function (req, cb) {
    var Member = req.app.models.Member;
    var Address = req.app.models.Address;
    Person.beginTransaction({isolationLevel: Person.Transaction.READ_COMMITTED}, function (err, tx) {
      var addressData = req.body.address;
      delete addressData.id;

      Address.update({id: req.body.addressId}, addressData, {transaction: tx}, function (err1, data1) {
        if (err1) {
          tx.rollback();
          cb(err1, null);
        }
        var personData = req.body;
        personData.modified_date = new Date();
        var memberId = req.body.memberId;
        var personid = req.body.id;
        delete personData.address;
        delete personData.id;
        personData.modifiedDate = new Date();
        Person.update({id: personid}, personData, {transaction: tx}, function (err2, data2) {
          if (err2) {
            tx.rollback();
            cb(err2, null);
          }
          var memberData = {
            'modified_date': new Date(),
            'status': personData.status
          };
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

  Person.personCreateTransaction = function (req, cb) {
    var Address = req.app.models.Address;
    Person.beginTransaction({isolationLevel: Person.Transaction.READ_COMMITTED}, function (err, tx) {
      var addressData = req.body.address;

      Address.create(addressData, {transaction: tx}, function (err1, data1) {
        if (err1) {
          tx.rollback();
          cb(err1, null);
        }
        var personData = req.body;
        delete personData.address;
        personData.addressId = data1.id;
        personData.createDate = new Date();
        personData.modifiedDate = new Date();
        Person.create(personData, {transaction: tx}, function (err2, data2) {
          if (err2) {
            tx.rollback();
            cb(err2, null);
          }
          tx.commit();
          cb(null, data2);
        });
      });
    })
  };

  Person.personUpdateTransaction = function (req, cb) {
    var Address = req.app.models.Address;
    Person.beginTransaction({isolationLevel: Person.Transaction.READ_COMMITTED}, function (err, tx) {
      var addressData = req.body.address;
      //delete addressData.id;

      Address.update({id: req.body.addressId}, addressData, {transaction: tx}, function (err1, data1) {
        if (err1) {
          tx.rollback();
          cb(err1, null);
        }
        var personData = req.body;
        personData.modifiedDate = new Date();
        var personid = req.body.id;
        delete personData.address;
        //delete personData.id;
        Person.update({id: personid}, personData, {transaction: tx}, function (err2, data2) {
          if (err2) {
            tx.rollback();
            cb(err2, null);
          }
          tx.commit();
          cb(null, data2);
        });
      });
    })
  };

  Person.remoteMethod(
    'memberCreateTransaction',
    {
      description: 'Add member with person and address details.',
      accepts: [
        {arg: 'req', type: 'object', http: {source: 'req'},
          description: 'Do not supply this argument, it is automatically extracted ' +
            'from request headers.'
        }
      ],
      returns: {
        arg: 'person', type: 'object',
        description: 'The response body contains properties of the Person'
      },
      http: {verb: 'post', path: '/memberperson'}
    }
  );

  Person.remoteMethod(
    'memberUpdateTransaction',
    {
      description: 'Update member with person and address details.',
      accepts: [
        {arg: 'req', type: 'object', http: {source: 'req'},
          description: 'Do not supply this argument, it is automatically extracted ' +
            'from request headers.'
        }
      ],
      returns: {
        arg: 'person', type: 'object',
        description: 'The response body contains properties of the Person'
      },
      http: {verb: 'put', path: '/memberperson'}
    }
  );

  Person.remoteMethod(
    'personCreateTransaction',
    {
      description: 'Add person with address details.',
      accepts: [
        {arg: 'req', type: 'object', http: {source: 'req'},
          description: 'Do not supply this argument, it is automatically extracted ' +
            'from request headers.'
        }
      ],
      returns: {
        arg: 'person', type: 'object',
        description: 'The response body contains properties of the Person'
      },
      http: {verb: 'post', path: '/personaddress'}
    }
  );

  Person.remoteMethod(
    'personUpdateTransaction',
    {
      description: 'Update person with address details.',
      accepts: [
        {arg: 'req', type: 'object', http: {source: 'req'},
          description: 'Do not supply this argument, it is automatically extracted ' +
            'from request headers.'
        }
      ],
      returns: {
        arg: 'person', type: 'object',
        description: 'The response body contains properties of the Person'
      },
      http: {verb: 'put', path: '/personaddress'}
    }
  );
};
