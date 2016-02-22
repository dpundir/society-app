/**
 * Created by Deepak.Pundir on 12/25/2015.
 */

var fs = require('fs');
var path=require('path');
var formidable = require('formidable');
var mkdirp = require('mkdirp');
var mime = require('mime-types');

var ensureExists = function (path, mask, cb) {
    if (typeof mask == 'function') { // allow the `mask` parameter to be optional
        cb = mask;
        mask = 0777;
    }
    fs.mkdir(path, mask, function(err) {
        if (err) {
            if (err.code == 'EEXIST') cb(null); // ignore the error if the folder already exists
            else cb(err); // something else went wrong
        } else cb(null); // successfully created folder
    });
}

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
                            res.json("Failed to upload your file");
                        }else {
                            res.json("Successfully uploaded your file");
                        }
                    });
                } else {
                    res.json("Failed to create or fetch upload directory for "+ fields.memberId);
                }
            });
        });
    });
};

var downloadFile = function (req, res){
    var fileName = req.params.fileName;
    var memberId = req.params.memberId;
    var downloadFileName = path.resolve(".", "storage", memberId, fileName);
    /*var stat = fs.statSync(downloadFileName);
    fs.readFile(downloadFileName, function(err, data){
        res.writeHead(200, {
            'Content-Type': mime.contentType(downloadFileName),
            'Content-Disposition': 'attachment; filename="' + fileName+'"',
            'Content-Length': stat.size
        });
        res.end(data, 'binary');
    });*/
    //var stat = fs.statSync(downloadFileName);
    /*var img = fs.readFileSync(downloadFileName);
    var datetime = new Date();
    res.writeHead(200, {
        'Cache-Control': 'max-age=0, no-cache, must-revalidate, proxy-revalidate',
        'Content-Type': mime.contentType(downloadFileName) ,
        'Content-Disposition': 'attachment;filename="' + fileName+'"',
        'Content-Length': stat.size,
        'Expires': 'Tue, 03 Jul 2001 06:00:00 GMT',
        'Last-Modified': datetime +'GMT'
    });

    res.end(img);*/
    res.download(downloadFileName);
};

var fileList = function (req, res){
    var memberId = req.params.memberId;
    var dirName = path.resolve(".", "storage", memberId);
    var img = fs.readdir(dirName, function(err, files){
        if(err){
            res.json('error in fetching download file list');
        }
        res.json(files);
    });
};

module.exports = {
    uploadFile: uploadFile,
    downloadFile: downloadFile,
    fileList: fileList
};