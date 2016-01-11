module.exports = function (Document) {
    Document.createDocument = function (req, cb) {
        var memberId = req.body.memberId;
        var fileName = req.files[0].filename;
        console.log(memberId + ', ' + fileName);
        var input = {
            memberId: memberId,
            name: fileName,
            status: 1,
            createDate: new Date()
        };

        Document.create(input, function (err1, data1) {
            if (err1) {
                cb(err1, null);
            }
        });
    };

    Document.remoteMethod(
        'createDocument',
        {
            description: 'Upload document for member.',
            accepts: [
                {arg: 'req', type: 'object', http: {source: 'req'},
                    description: 'Do not supply this argument, it is automatically extracted ' +
                        'from request headers.'
                }
            ],
            returns: {
                arg: 'id', type: 'string',
                description: 'The response body contains id of the uploaded document'
            },
            http: {verb: 'post', path: '/upload'}
        }
    );
};
