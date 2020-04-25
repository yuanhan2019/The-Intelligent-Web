var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Stories = new Schema(
    {
        text: {type: String},
        username: {type: String},
        userImage1:{ type: String},
        userImage2:{ type: String},
        userImage3:{ type: String},
        createAt: {type: Date, default: Date.now()}
    }, {collection: 'stories'}
);

Stories.set('toObject', { getters: true, virtuals: true });

var storieModel = mongoose.model('Stories', Stories);

module.exports = storieModel;