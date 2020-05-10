var UserStories = require('../models/stories');

exports.insertStory = function (req, res) {
  try {
    UserStories.create(req.body, function (err, result) {
      if (err) {
        res.status(403).send(err);
      } else {
        res.send(result);
      }
    });
  } catch (e) {
    res.status(500).send('error ' + e);
  }
};

exports.getAllData = function (req, res) {
  try {
    UserStories.find({}, {}, function (err, data) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(data));
    }).sort({ createAt: -1 });
  } catch (e) {
    res.status(500).send('error ' + e);
  }
};

exports.ser = function (req, res) {
  try {
    UserStories.find({
      text:new RegExp(req.body.text,'i')
    }, {}, function (err, data) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(data));
    }).sort({ createAt: -1 });
  } catch (e) {
    res.status(500).send('error ' + e);
  }
};

exports.getUserStory = function (req, res) {
  try {
    UserStories.find({ userId: req.params.id }, {}, function (err, docs) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(docs));
    }).sort({ createAt: -1 });
  } catch (e) {
    res.status(500).send('error ' + e);
  }
};

exports.userStoryDelete = function (req, res) {
  try {
    UserStories.deleteOne({ _id: req.params.id }, function (err, doc) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(doc));
    });
  } catch (e) {
    res.status(500).send('error ' + e);
  }
};

exports.addlike = function (req, res) {
  try {
    UserStories.findOne({ _id: req.params.id }, function (err, result) {
      if (err) {
        res.status(500).send('Invalid data!');
      } else {
        let newlikes = [...result, {
          userId:req.params.userId,
          likeNum:req.params.num
        }];
        UserStories.updateOne(
          { _id: req.params.id },
          {
            likes: newlikes,
          },
          function (err2, result2) {
            if (err2) {
              res.status(500).send('Invalid data!');
            } else {
           
              res.setHeader('Content-Type', 'application/json');
              res.send(JSON.stringify(result2));
            }
          },
        );
      }
    });
  } catch (e) {
    res.status(500).send('error ' + e);
  }
};



exports.addCommant = function (req, res) {
  try {
    UserStories.findOne({ _id: req.body.id }, function (err, result) {
      if (err) {
        res.status(500).send('Invalid data!');
      } else {
        let newlikes = [...result, req.body];
        UserStories.updateOne(
          { _id: req.body.id },
          {
            commants: newlikes,
          },
          function (err2, result2) {
            if (err2) {
              res.status(500).send('Invalid data!');
            } else {
           
              res.setHeader('Content-Type', 'application/json');
              res.send(JSON.stringify(result2));
            }
          },
        );
      }
    });
  } catch (e) {
    res.status(500).send('error ' + e);
  }
};

/*
exports.getAllData = function (req, res) {
    try {
        stories.find(req.body, function (err, result) {
            if (err) {
                res.status(500).send('Invalid data!');
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(result));
            }
        });
    } catch (e) {
        res.status(500).send('error ' + e);
    }
};

exports.insert = function (req, res) {
    try {
        stories.insert(req.body, function (err, result) {
            if (err) {
                res.status(500).send('Invalid data!');
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(result));
            }
        });
    } catch (e) {
        res.status(500).send('error ' + e);
    }
};

exports.update = function (req, res) {
    try {
        stories.update(req.params.id, req.body, function (err, result) {
            if (err) {
                res.status(500).send('Invalid data!');
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(result));
            }
        });
    } catch (e) {
        res.status(500).send('error ' + e);
    }
};*/
