var User = require('../models/user');

exports.insert=function(req,res) {
    const dat=new Date(Date.now());
    var userData=req.body;
   // console.log('received: ' + userData);
     if(userData==null){
         res.status(403).send("No data sent!");
    }
    try{
        var user= new User({
            username:userData.username,
            password: userData.password1,
            email_address:userData.address,
            createAt:dat});
        console.log('received: ' + user);
        user.save(function(err,results){
            console.log(results.id);
            if(err)
                res.status(500).send('Invalid data!');

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(user));
        });
        //res.render('index', { title: 'Express' });




        // User.find({email_address: userData.address},
        //     function (users) {
        //         if (users.length!= 0) {
        //             res.status(500).send("Address is already registered!");
        //         }
        //         else{
        //             User.find({email_address: userData.username},
        //                 function (users) {
        //                 if (users.length> 0){
        //                     res.status(500).send("Username is already registered!");
        //                 }
        //                 else{
        //                     var user= new User({
        //                         username:userData.username,
        //                         password: userData.password1,
        //                         email_address:userData.address,
        //                         createAt:dat});
        //                     user.save(function(err,result){
        //                         console.log(result.id);
        //                         if(err)
        //                             res.status(500).send('Invalid data!');
        //
        //                         //res.setHeader('Content-Type', 'application/json');
        //                         res.send('Submitted successfully!');
        //                     });
        //                     res.render('index', { title: 'Express' });
        //                 }
        //             });
        //            }
        //         });
    }
    catch (e) {
        res.status(500).send('error ' + e);
    }}





