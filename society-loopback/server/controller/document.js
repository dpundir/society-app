/**
 * Created by Deepak.Pundir on 12/25/2015.
 */

var fs = require('fs');
var path=require('path');
var formidable = require('formidable');
var mkdirp = require('mkdirp');
var _ = require('lodash');
var mime = require('mime-types');

var uploadFile = function(req, res) {
    var Person = req.app.models.Person;
    var personId = req.params.personId;
    var isProfileFile = req.params.document === 'profile';
    var form = new formidable.IncomingForm({
        keepExtensions: true
    });
    form.parse(req, function(err, fields, files) {
        fs.readFile(files.file.path, function (err, data){ // readfilr from the given path
            var dirname = path.resolve(".", "storage", personId); // path.resolve(“.”) get application directory path
            mkdirp(dirname, function(err) {
                var fileExtn = mime.extension(mime.contentType(files.file.name));
                var fileName = isProfileFile? ('userProfile.'+fileExtn) : files.file.name;
                var newPath = path.join(dirname, fileName); // add the file name
                if (!err) {
                    fs.writeFile(newPath, data, function (err) { // write file in uploads folder
                        if(err){
                            res.status(500).json("Failed to upload your file to storage");
                        } else if(!err && isProfileFile){
                            Person.update({id: personId}, {profilePhotoName: fileName}, function (err, data) {
                                if (err) {
                                    res.status(500).json("Failed to upload your file to person");
                                } else {
                                    res.json("Successfully uploaded your file");
                                }
                            });
                        }
                    });
                } else {
                    res.status(500).json("Failed to create or fetch upload directory for "+ fields.personId);
                }
            });
        });
    });
};

var downloadFile = function (req, res){
    var fileName = req.params.fileName;
    var personId = req.params.personId;
    var downloadFileName = path.resolve(".", "storage", personId, fileName);
    console.log(downloadFileName);
    res.download(downloadFileName);
};

var deleteFile = function (req, res){
    var Person = req.app.models.Person;
    var fileName = req.params.fileName;
    var personId = req.params.personId;
    var isProfileFile = req.params.document === 'profile';
    var fileName = path.resolve(".", "storage", personId, fileName);
    console.log(fileName);
    var img = fs.unlink(fileName, function(err){
        if(err){
            res.status(500).json('error in deleting file from storage');
        } else if(!err && isProfileFile){
            Person.update({id: personId}, {profilePhotoName: null}, function (err, data) {
                if (err) {
                    res.status(500).json("error in deleting file from person");
                } else {
                    res.sendStatus(200);
                }
            });
        }

    });
};

var fileList = function (req, res){
    var personId = req.params.personId;
    var dirName = path.resolve(".", "storage", personId);
    var img = fs.readdir(dirName, function(err, files){
        if(err){
            res.status(500).json('error in fetching download file list');
        }
        files = _.remove(files, function(file){
            return !_.startsWith(file, "userProfile");
        });
        res.json(files);
    });
};

var editFile = function(req, res){

}

module.exports = {
    uploadFile: uploadFile,
    downloadFile: downloadFile,
    deleteFile: deleteFile,
    editFile: editFile,
    fileList: fileList
};