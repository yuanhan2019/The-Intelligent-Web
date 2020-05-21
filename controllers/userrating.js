var UserRatings = require('../models/ratings');

exports.insertRating = function (req, res) {
    var userData=req.body;
    if(userData==null){
        res.status(403).send("No data sent!");
    }

    try{
        var userRatings= new UserRatings({
            username:userData.username,
            story:userData.story,
            rating: userData.rating
        });
        userRatings.save(function(err,result){});
    }catch (e) {
        res.status(500).send('error ' + e);
    }
}



