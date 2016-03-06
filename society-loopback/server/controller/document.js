/**
 * Created by Deepak.Pundir on 12/25/2015.
 */

var fs = require('fs');
var path=require('path');
var formidable = require('formidable');
var mkdirp = require('mkdirp');

var uploadFile = function(req, res) {
    var form = new formidable.IncomingForm({
        keepExtensions: true
    });
    form.parse(req, function(err, fields, files) {
        fs.readFile(files.file.path, function (err, data){ // readfilr from the given path
            var dirname = path.resolve(".", "storage", fields.memberId); // path.resolve(“.”) get application directory path
            mkdirp(dirname, function(err) {
                var newPath = path.join(dirname, files.file.name); // add the file name
                if (!err) {
                    fs.writeFile(newPath, data, function (err) { // write file in uploads folder
                        if(err){
                            res.status(500).json("Failed to upload your file");
                        }else {
                            res.json("Successfully uploaded your file");
                        }
                    });
                } else {
                    res.status(500).json("Failed to create or fetch upload directory for "+ fields.memberId);
                }
            });
        });
    });
};

var downloadFile = function (req, res){
    var fileName = req.params.fileName;
    var memberId = req.params.memberId;
    var downloadFileName = path.resolve(".", "storage", memberId, fileName);
    res.download(downloadFileName);
};

var fileList = function (req, res){
    var memberId = req.params.memberId;
    var dirName = path.resolve(".", "storage", memberId);
    var img = fs.readdir(dirName, function(err, files){
        if(err){
            res.status(500).json('error in fetching download file list');
        }
        res.json(files);
    });
};

module.exports = {
    uploadFile: uploadFile,
    downloadFile: downloadFile,
    fileList: fileList
};