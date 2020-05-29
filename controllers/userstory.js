var UserStories = require('../models/stories');

/**
 * @insertStory
 * This functionality is to insert a story to database, in stories model.
 *
 *
 */
exports.insertStory = function (req, res) {
    var userData=req.body;
    if(userData==null){
        res.status(403).send("No data sent!");
    }
    try{
        if(userData.userImage1==null){
            console.log("No images");
        }else if(userData.userImage1!=null && userData.userImage2==null){
            console.log("Only 1 image has been input");
            var userStories= new UserStories({
                text:userData.text,
                username:userData.username,
                userImage1:userData.userImage1,
                createAt: userData.createAt
            });
        }else if(userData.userImage2!=null && userData.userImage3==null){
            console.log("There are 2 images have been input");
            var userStories= new UserStories({
                text:userData.text,
                username:userData.username,
                userImage1:userData.userImage1,
                userImage2:userData.userImage2,
                createAt: userData.createAt
            });
        }else if(userData.userImage3!=null){
            console.log("There are 3 images have been input");
            var userStories= new UserStories({
                text:userData.text,
                username:userData.username,
                userImage1:userData.userImage1,
                userImage2:userData.userImage2,
                userImage3:userData.userImage3,
                createAt: userData.createAt
            });
        }
        userStories.save(function(err,result){});
    }catch (e) {
        res.status(500).send('error ' + e);
    }
}



exports.getAllData=function(req,res){
    try {
        UserStories.find ({username: req.body.username},{},
            function (err,data) {
                res.setHeader('Content-Type',	'application/json');
                res.send(JSON.stringify(data));
            }).sort({"createAt":-1});

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