var mongoose = require('mongoose');
var User = require('../models/user');
exports.setUser=function(req,res){
    const dat=new Date(Date.now());
    var userData=req.body;
    if(userData==null){
        res.status(403).send('No data sent!');
    }
    try{
           var user= new User({
               username:userData.username,
               password: userData.password1,
               address:userData.address,
               createAt:dat});
            user.save(function(err,result){
               console.log(result.id);
            });
            res.render('index', { title: 'Express' })

    }catch(e){
        res.status(500).send('error'+e);
    }

}