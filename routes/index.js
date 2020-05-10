var express = require('express');
var router = express.Router();
var bodyParser= require("body-parser");

var initDB=require('../controllers/init');
var setUser=require('../controllers/signup');
var login=require('../controllers/login');
var setStory=require('../controllers/userstory');
initDB.init();

//var app=express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Express' });
});

router.get('/edit', function(req, res, next) {
  res.render('edit', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});
router.get('/home',function(req,res,next){
  res.render('home',{ title : 'Express', });
});
router.get('/initHome',setStory.getAllData);


router.post('/insert',setUser.insert);
router.post('/login',login.login);

router.post('/user/update/:id',login.update);

router.post('/insertStory',setStory.insertStory);

router.get('/getUserStory/:id',setStory.getUserStory);
router.delete('/userStory/delete/:id',setStory.userStoryDelete);

router.get('/userStory/addlike/:id/:userId/:num',setStory.addlike);
router.post('/userStory/addCommant',setStory.addCommant);
router.post('/ser',setStory.ser);


module.exports = router;
