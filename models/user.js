var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema(
    {
         username: {type: String, required: true, max: 100},
         password: {type: String, required: true, max: 100},
         address:{type:String,required: true, max: 100},
         createAt:{type:Date, default:Date.now()}
        // dob: {type: Number},
        // whatever: {type: String} //any other field
    }
);

// // Virtual for a character's age
// user.virtual('age')
//     .get(function () {
//         const currentDate = new Date().getFullYear();
//         const result= currentDate - this.dob;
//         return result;
//     });

//User.set('toObject', {getters: true, virtuals: true});


var userModel = mongoose.model('User', User );

module.exports = userModel;