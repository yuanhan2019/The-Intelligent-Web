var mongoose = require('mongoose');
var Users = require('../models/user');
exports.setUser=function(req,res){
    const dat=new Date(1997,10,1).getFullYear();
    var userData=req.body;
    if(userData==null){
        res.status(403).send('No data sent!');
    }
    try{
           var user= new user({username:userData.username,
               password: userData.password1,
               address:userData.address,
               createAt:dat});
            user.save(function(err,result){
               console.log(result.id);
            });

    }catch(e){
        res.status(500).send('error'+e);
    }

}