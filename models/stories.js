var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Stories = new Schema(
    {
        text: {type: String},
        userId: {type: String, ref: 'user'},
        userImage:{ type: String, required:true},
        createAt: {type: Date, default: Date.now()}
    }, {collection: 'stories'}
);

Stories.set('toObject', { getters: true, virtuals: true });

var storieModel = mongoose.model('Stories', Stories);

module.exports = storieModel;