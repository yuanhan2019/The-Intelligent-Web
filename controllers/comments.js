var comment = require('../models/comments');

exports.insert = function(req, res) {
  try {
    comment.insert(req.body, function(err, result) {
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

