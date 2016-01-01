module.exports = function(Member) {

  var moment = require('moment');

  Member.memberTransaction = function(req, cb){
    var TransactionHistory = req.app.models.TransactionHistory;
    Member.beginTransaction({isolationLevel: Member.Transaction.READ_COMMITTED}, function(err, tx){
      var memberid = req.body.memberId;
      var deposit = req.body.depositAmount;

      TransactionHistory.create(req.body, {transaction: tx}, function(err1, data1) {
        if(err1){
          tx.rollback();
          cb(err1, null);
        }
        Member.findById(memberid, {transaction: tx}, function(err2, data2){
          if(err2){
            tx.rollback();
            cb(err2, null);
          }
          Member.update({id: memberid}, {deposit: data2.deposit+deposit}, {transaction: tx}, function(err3, data3){
            if(err3){
              tx.rollback();
              cb(err3, null);
            }
            tx.commit();
          });
        });
      });
    })
  };

  Member.applyInterest = function(req, cb){
    var TransactionHistory = req.app.models.TransactionHistory;
    Member.beginTransaction(function(err, tx){
      var memberid = req.body.member_id;

      var startDate = moment().startOf('month').toDate();
      var middleDate = moment().startOf('month').add(14, 'days').toDate();

      TransactionHistory.find({where: {member_id: memberid, create_date:{between: [startDate,middleDate]}, type: 1}}, {transaction: tx}, function(err1, data1) {
        if(err1){
          cb(err1, null);
        }
        var deposit =0;
        for(var i =0; i<data1.length ; i++){
          deposit+=data[i].deposit_amount;
        }
        //To-Do: fetch from society-config
        var rateOfInterest = 0.06;
        Member.findById(memberid, {transaction: tx}, function(err2, data2){
          if(err2){
            cb(err2, null);
          }
          Member.update({id: memberid}, {deposit: data2.deposit+deposit}, {transaction: tx}, function(err3, data3){
            if(err3){
              cb(err3, null);
            }
            tx.commit();
          });
        });
      });
    })
  };

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
        description:
          'The response body contains properties of the Transaction History'
      },
      http: {verb: 'post', path: '/transaction'}
    }
  );
};
