var UserStories = require('../models/stories');



exports.insertStory = function (req, res) {
    var userData=req.body;
    if(userData==null){
        res.status(403).send("No data sent!");
    }
    try{
        var userStories= new UserStories({
            userImage:userData.userImage
            });

        userStories.save(function(err,result){
        });
    }catch (e) {
        res.status(500).send('error ' + e);
    }
}

exports.getAllData=function(req,res){
    try {
        UserStories.find ({},'userImage',
            function (err,data) {
                console.log(data);
                res.setHeader('Content-Type',	'application/json');
                res.send(JSON.stringify(data));
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