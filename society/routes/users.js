var express = require('express');
var router = express.Router();

var societyService = require('../rest/society-service');

/* GET users listing. */
router.get('/get/member', societyService.fetchMemberData);
router.get('/get/member/:id', societyService.fetchMemberData);
router.post('/post/member', societyService.createMemberData);
router.put('/put/member/:id', societyService.updateMemberData);
router.get('/get/:entity', societyService.fetchEntityData);
router.get('/get/:entity/:id', societyService.fetchEntityData);
router.post('/post/:entity', societyService.createEntityData);
router.put('/put/:entity/:id', societyService.updateEntityData);

module.exports = router;
