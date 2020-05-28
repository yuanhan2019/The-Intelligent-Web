var express = require('express');
var router = express.Router();
var bodyParser= require("body-parser");

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
  let name = req.body.ranking_name;
  console.log("ranking_name");
  console.log(name);
  let ranking= new Ranking();
  let results= ranking.getRecommendations(critics, name, 'sim_euclidean');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(results));
});

const critics = {
  'Lisa Rose': [{
    'Lady in the Water': 2.5
  },
    {
      'Snakes on a Plane': 3.5
    },
    {
      'Just My Luck': 3.0
    },
    {
      'Superman Returns': 3.5
    },
    {
      'You, Me and Dupree': 2.5
    },
    {
      'The Night Listener': 3.0
    }
  ],
  'Gene Seymour': [{
    'Lady in the Water': 3.0
  },
    {
      'Snakes on a Plane': 3.5
    },
    {
      'Just My Luck': 1.5
    },
    {
      'Superman Returns': 5.0
    },
    {
      'You, Me and Dupree': 3.5
    },
    {
      'The Night Listener': 3.0
    }
  ],
  'Michael Phillips': [{
    'Lady in the Water': 2.5
  },
    {
      'Snakes on a Plane': 3.0
    },
    {
      'Superman Returns': 3.5
    },
    {
      'The Night Listener': 4.0
    }
  ],
  'Claudia Puig': [{
    'Snakes on a Plane': 3.5
  },
    {
      'Just My Luck': 3.0
    },
    {
      'Superman Returns': 4.0
    },
    {
      'You, Me and Dupree': 2.5
    },
    {
      'The Night Listener': 4.5
    }
  ],
  'Mick LaSalle': [{
    'Lady in the Water': 3.0
  },
    {
      'Snakes on a Plane': 4.0
    },
    {
      'Just My Luck': 2.0
    },
    {
      'Superman Returns': 3.0
    },
    {
      'You, Me and Dupree': 2.0
    },
    {
      'The Night Listener': 3.0
    }
  ],
  'Jack Matthews': [{
    'Lady in the Water': 3.0
  },
    {
      'Snakes on a Plane': 4.0
    },
    {
      'Superman Returns': 5.0
    },
    {
      'You, Me and Dupree': 3.5
    },
    {
      'The Night Listener': 3.0
    }
  ],
  'Toby': [{
    'Snakes on a Plane': 4.5
  },
    {
      'Superman Returns': 4.0
    },
    {
      'You, Me and Dupree': 1.0
    },
  ]
}

module.exports = router;
