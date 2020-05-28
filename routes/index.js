var express = require('express');
var router = express.Router();
var bodyParser= require("body-parser");
var fs = require('fs');
var path = require('path');
var initDB=require('../controllers/init');
var setUser=require('../controllers/signup');
var login=require('../controllers/login');
var setStory=require('../controllers/userstory');
var setRating=require('../controllers/userrating');
const Ranking= require('../CollectiveIntelligence/Ranking');
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
router.post('/initHome',setStory.getAllData);


router.post('/insert',setUser.insert);
router.post('/login',login.login);

router.post('/user/update/:id',login.update);

router.post('/insertStory',setStory.insertStory);
router.post('/insertRating',setRating.insertRating);
router.post('/ranking', function (req, res, next) {
  //let name = req.body.ranking_name;
  console.log("In post");
  let ranking= new Ranking();
  let results= ranking.getRecommendations(req,body.users, "user_1", 'sim_euclidean');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(results));
});


module.exports = router;
