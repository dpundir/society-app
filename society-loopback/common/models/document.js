module.exports = function (Document) {
    var formidable = require('formidable');
    var fs = require('fs');
    Document.createDocument = function (req, res, cb) {
        var form = new formidable.IncomingForm({
            keepExtensions: true
        });
        form.parse(req, function(err, fields, files) {
            var readData = fs.readFileSync(files.file.path);
            if(!Buffer.isBuffer(readData)){
                readData = new Buffer(readData);
            }
            var input = {
                id: '',
                memberId: fields.memberId,
                name: files.file.name,
                status: 1,
                createDate: Date.now(),
                type: files.file.type,
                data: readData
            };
            Document.create(input, function(err, data1){
                if(err){
                    cb(err, null);
                }
                cb(null, data1.id);
            });
        });
    };

    Document.fetchDocument = function (req, res, cb) {
        var documentId = req.params.documentId;
        var memberId = req.params.memberId;
        var filter = {
            "where" : {
                "memberId": memberId,
                "status": 1
            }
        };

        Document.findById(documentId, function (err, data) {
            if (err) {
                cb(err, null);
            }
            cb(null, data.data);
        });
    };

    Document.fetchDocumentList = function (req, res, cb) {
        var memberId = req.params.memberId;
        var filter = {
            "where" : {
                "memberId": memberId,
                "status": 1
            },
            "fields": [
                "id", "name", "type", "memberId", "createDate", "status"
            ]
        };

        Document.find(filter, function (err, data) {
            if (err) {
                cb(err, null);
            }
            cb(null, data);
        });
    };

    Document.remoteMethod(
        'createDocument',
        {
            description: 'Upload document for member.',
            accepts: [
                {
                    arg: 'req', type: 'object', http: {source: 'req'},
                    description: 'Do not supply this argument, it is automatically extracted ' +
                        'from request headers.'
                }, {
                    arg: 'res', type: 'object', http: {source: 'res'},
                    description: 'Do not supply this argument, it is automatically extracted ' +
                        'from response headers.'
                }
            ],
            returns: {
                arg: 'id', type: 'object',
                description: 'The response body contains data of the uploaded document'
            },
            http: {verb: 'post', path: '/upload'}
        }
    );

    Document.remoteMethod(
        'fetchDocument',
        {
            description: 'Fetch document for passed id.',
            accepts: [
                {
                    arg: 'req', type: 'object', http: {source: 'req'},
                    description: 'Do not supply this argument, it is automatically extracted ' +
                        'from request headers.'
                }, {
                    arg: 'res', type: 'object', http: {source: 'res'},
                    description: 'Do not supply this argument, it is automatically extracted ' +
                        'from response headers.'
                }
            ],
            returns: {
                arg: 'file', type: 'object',
                description: 'The response body contains data of the uploaded document'
            },
            http: {verb: 'get', path: '/:memberId/fetch/:documentId'}
        }
    );

    Document.remoteMethod(
        'fetchDocumentList',
        {
            description: 'Fetch document list for passed member id.',
            accepts: [
                {
                    arg: 'req', type: 'object', http: {source: 'req'},
                    description: 'Do not supply this argument, it is automatically extracted ' +
                        'from request headers.'
                }, {
                    arg: 'res', type: 'object', http: {source: 'res'},
                    description: 'Do not supply this argument, it is automatically extracted ' +
                        'from response headers.'
                }
            ],
            returns: {
                arg: 'documentList', type: 'array', root: true,
                description: 'The response body contains data of the uploaded document'
            },
            http: {verb: 'get', path: '/:memberId/fetch'}
        }
    );
};
