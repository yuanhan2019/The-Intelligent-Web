var UserStories = require('../models/stories');



exports.insert = function (req, res) {
    const dat=new Date(Date.now());

    try{


    }catch (e) {




    }




}


exports.get








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