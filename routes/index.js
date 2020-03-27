var express = require('express');
var router = express.Router();

var user=require('../controllers/user');
var initDB=require('../controllers/init');
initDB.init();
var app=express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Express' });
});




module.exports = router;
