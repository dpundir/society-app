module.exports = function(Loan) {
    var _ = require('lodash');

    Loan.loanTotalAmount = function (req, cb) {
        Loan.find({}, function (err, data) {
            if (err) {
                cb(err, null);
            }
            var total = _.sum(data, function(obj){
                return obj.amount;
            });
            cb(null, total);
        });
    };

    Loan.remoteMethod(
        'loanTotalAmount',
        {
            description: 'Calculate total amount of all loans.',
            accepts: [
                {arg: 'req', type: 'object', http: {source: 'req'},
                    description: 'Do not supply this argument, it is automatically extracted ' +
                        'from request headers.'
                }
            ],
            returns: {
                arg: 'total', type: 'number', root: true,
                description: 'The response body contains total amount of all loans.'
            },
            http: {verb: 'get', path: '/total'}
        }
    );
};
