var User = require('../models/user');

/**
 * @insert
 * This functionality is to insert a new user information to database, in user model.
 * The duplicate username will be checked.
 *
 *
 */
exports.insert=function(req,res) {
    const dat=new Date(Date.now());
    var userData=req.body;
     if(userData==null){
         res.status(403).send("No data sent!");
    }
    try{
        User.find({email_address: userData.address},'username',
            function (err,users) {
                if (users.length>0) {
                    res.status(500).send("Address is already registered!");
                }
                else{
                    User.find({username: userData.username},'username',
                        function (err,users) {
                        if (users.length>0){
                            res.status(500).send("Username is already registered!");
                        }
                        else{
                            var user= new User({
                                username:userData.username,
                                password: userData.password1,
                                email_address:userData.address,
                                createAt:dat});
                            user.save(function(err,result){
                                console.log(result.id);
                                if(err) {
                                    res.status(500).send('Invalid data!');
                                }else{
                                    res.setHeader('Content-Type',	'application/json');
                                    res.send(JSON.stringify(userData));
                                }
                            });

                        }
                    });
                   }
                });
    }
    catch (e) {
        res.status(500).send('error ' + e);
    }}





