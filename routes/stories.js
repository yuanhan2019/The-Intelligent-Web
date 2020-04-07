var express = require('express');
var router = express.Router();

var stories = require('../controllers/stories');

router.get('/', stories.getAllData);
router.post('/insert', stories.insert);
router.post('/update/:id', stories.update);
// router.post('/:id/addcomment', stories.addcomment);
// router.post('/:id/addlike', stories.addlike);

module.exports = router;
