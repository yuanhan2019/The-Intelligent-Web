var express = require('express');
var router = express.Router();

var user=require('../controllers/user');
var initDB=require('../controllers/init');
initDB.init();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
