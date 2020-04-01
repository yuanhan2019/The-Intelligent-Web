var express = require('express');
var router = express.Router();

var stories = require('../controllers/stories');

router.get('/', stories.getAllData);
router.post('/insert', stories.insert);

module.exports = router;
