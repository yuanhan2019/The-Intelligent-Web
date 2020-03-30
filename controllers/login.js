var User = require('../models/user');

exports.login=function(req,res) {
    const dat=new Date(Date.now());
    var userData=req.body;

    if(userData==null){
        res.status(403).send("No data sent!");
    }
    try{
        User.find({username: userData.username},
            function (err,user) {
                if (user.length==1) {
                    if(user[0].password==userData.password){
                        res.setHeader('Content-Type',	'application/json');
                        res.send(JSON.stringify(user));
                    }else{
                        res.status(500).send("Password is incorrect!");
                    }
                }
                else{
                    res.status(500).send("Username has not been registered!");
                }
            });
    }
    catch (e) {
        res.status(500).send('error ' + e);
    }}





