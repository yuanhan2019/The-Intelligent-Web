var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Likes = new Schema(
  {
    likeType: {
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
    storieId: {
      type: String,
      required: true,
      ref: 'stories',
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: 'likes',
  },
);

Likes.set('toObject', { getters: true, virtuals: true });

var likeModel = mongoose.model('Likes', Likes);

module.exports = likeModel;
