var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Stories = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
            ref: 'user',
        },
        userImage:{
          type: String,
            required:true,
        },
        comments: {
            comment: {
                type: String,
                required: true,
            },
            userId: {
                type: String,
                required: true,
                ref: 'user',
            },
        },
        likes: {
            rate: {
                type: Number,
                required: true,
                min: 1,
                max: 5,
            },
            userId: {
                type: String,
                required: true,
                ref: 'user',
            },
        },
        createAt: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        collection: 'stories',
    },
);

Stories.set('toObject', { getters: true, virtuals: true });

var storieModel = mongoose.model('Stories', Stories);

module.exports = storieModel;