/**
 * Created by Deepak.Pundir on 12/25/2015.
 */
var uploadDocument = function (req, res) {
  var Document = req.app.models.Document;
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

module.exports = {
  uploadDocument: uploadDocument
}