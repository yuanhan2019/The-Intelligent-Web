var express = require('express');
var router = express.Router();
var bodyParser= require("body-parser");

var app=require('express')();
var server= require('http').Server(app);
var io= require('socket.io')(server);
server.listen(80);

app.get('/' ,function (req,res) {
  res.sendfile((__dirname, 'views')+'/sockettest.ejs')
});

io.on('connection',function (socket) {
    socket.emit('news', {hello:'world'});
    socket.on('my other event',function(data){
      console.log(data);
    });
  });






var initDB=require('../controllers/init');
var setUser=require('../controllers/signup');
var login=require('../controllers/login');
initDB.init();

//var app=express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});
router.get('/home',function(req,res,next){
  console.log(req.body);
  res.render('home',{ title : 'Express', });
});
router.post('/insert',setUser.insert);
router.post('/login',login.login);





module.exports = router;
