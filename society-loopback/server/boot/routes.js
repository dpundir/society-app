/**
 * Created by Deepak.Pundir on 12/17/2015.
 */
module.exports = function (app) {
    var router = app.loopback.Router();
    var authentication = require("../controller/authentication");
    var document = require("../controller/document");

    router.get('/app', function (req, res) {
        res.render('index.html');
    });

    //log a user in
    router.post('/login', authentication.login);
    router.get('/logout', authentication.logout);
    router.get('/usermember', authentication.userMember);

    //send an email with instructions to reset an existing user's password
    router.post('/request/reset/password', authentication.requestResetPassword);

    //reset the user's pasword
    router.post('/reset/password', authentication.resetPassword);

    router.post('/file/:personId/:document', document.uploadFile);
	router.put('/file/:personId/:document', document.editFile);
    router.get('/file/:personId/:document', document.fileList);

    router.get('/file/:personId/:document/:fileName', document.downloadFile);

    router.delete('/file/:personId/:document/:fileName', document.deleteFile);

    router.put('/file/:personId/:document/:fileName', document.editFile);

    app.use(router);
}