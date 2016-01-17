/**
 * Created by Deepak.Pundir on 12/25/2015.
 */


var formidable = require('formidable');
var fs = require('fs');

var uploadDocument = function (req, res) {
    var Document = req.app.models.Document;
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
            data: "X'" + readData.toString('hex') + "'"
        };/*
        var connector = Document.getConnector();
            var sqlString = "INSERT INTO `document`(`id`,`member_id`,`name`,`status`,`create_date`,`type`,`data`) VALUES(?,?,?,?,?,?,?)";
        var params = [0, 1, "swastik-4397835.jpg", 1, "2016-01-17 14:40:17", "image/jpeg"];
        params.push("X'" + readData.toString('hex') + "'");
        connector.execute(sqlString, params, {}, function(err, data1){*/
        Document.create(input, function(err, data1){
            if(err){
                res.status(500).send(err);
            }
            res.send(data1);
        });
    });
};

var fetchDocument = function (req, res) {
    var Document = req.app.models.Document;
    var documentId = req.param.documentId;

    Document.findById(documentId, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data.data);
        }
    });
};

module.exports = {
    uploadDocument: uploadDocument,
    fetchDocument: fetchDocument
}