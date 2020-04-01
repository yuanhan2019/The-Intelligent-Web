var express = require('express');
var router = express.Router();

var likes = require('../controllers/likes');


router.post('/insert', likes.insert);

module.exports = router;
