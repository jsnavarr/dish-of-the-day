var express = require('express');
var router = express.Router();
var commentsCtrl = require('../controllers/comments');

router.post('/dishes/:id/comment', commentsCtrl.create);

module.exports = router;
