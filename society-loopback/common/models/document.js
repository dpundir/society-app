module.exports = function (Document) {
    var formidable = require('formidable');
    var fs = require('fs');
    Document.createDocument = function (req, cb) {
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
            };/*
             var connector = Document.getConnector();
             var sqlString = "INSERT INTO `document`(`id`,`member_id`,`name`,`status`,`create_date`,`type`,`data`) VALUES(?,?,?,?,?,?,?)";
             var params = [0, 1, "swastik-4397835.jpg", 1, "2016-01-17 14:40:17", "image/jpeg"];
             params.push("X'" + readData.toString('hex') + "'");
             connector.execute(sqlString, params, {}, function(err, data1){*/
            Document.create(input, function(err, data1){
                if(err){
                    cb(err, null);
                }
                cb(null, data1.id);
            });
        });
    };
    Document.fetchDocument = function (req, cb) {
        //var memberId = req.body.memberId;
        var documentId = req.param.documentId;

        Document.findById(documentId, function (err, data) {
            if (err) {
                cb(err, null);
            }
            cb(null, data.data);
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
                arg: 'file', type: 'buffer',
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
                {arg: 'req', type: 'object', http: {source: 'req'},
                    description: 'Do not supply this argument, it is automatically extracted ' +
                        'from request headers.'
                }
            ],
            returns: {
                arg: 'file', type: 'buffer',
                description: 'The response body contains data of the uploaded document'
            },
            http: {verb: 'get', path: '/fetch/{documentId}'}
        }
    );
};
