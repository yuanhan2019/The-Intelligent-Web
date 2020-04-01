var express = require('express');
var router = express.Router();
var bodyParser= require("body-parser");

var initDB=require('../controllers/init');
var setUser=require('../controllers/signup');
initDB.init();
//var app=express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});
router.post('/insert',setUser.insert);


router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Express' });
});



module.exports = router;