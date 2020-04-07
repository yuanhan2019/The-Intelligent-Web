var stories = require('../models/stories');

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
};

// exports.addcomment = function (req, res) {
//   try {
//     stories.findOne({ _id: req.params.id }, (err2, res2) => {
//       let body = res2.comments;
//       body.push(req.body);
//       stories.update(req.params.id, { comments: body }, function (err, result) {
//         if (err) {
//           res.status(500).send('Invalid data!');
//         } else {
//           res.setHeader('Content-Type', 'application/json');
//           res.send(JSON.stringify(result));
//         }
//       });
//     });
//   } catch (e) {
//     res.status(500).send('error ' + e);
//   }
// };

// exports.addlike = function (req, res) {
//   try {
//     stories.findOne({ _id: req.params.id }, (err2, res2) => {
//       let body = res2.likes;
//       body.push(req.body);
//       stories.update(req.params.id, { likes: body }, function (err, result) {
//         if (err) {
//           res.status(500).send('Invalid data!');
//         } else {
//           res.setHeader('Content-Type', 'application/json');
//           res.send(JSON.stringify(result));
//         }
//       });
//     });
//   } catch (e) {
//     res.status(500).send('error ' + e);
//   }
// };
