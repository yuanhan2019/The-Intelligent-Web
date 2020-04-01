var express = require('express');
var router = express.Router();

var Comments = require('../controllers/comments');


router.post('/insert', Comments.insert);

module.exports = router;
