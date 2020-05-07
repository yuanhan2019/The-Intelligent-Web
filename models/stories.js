var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Schema = mongoose.Schema;

var Stories = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    userId: {
      type: ObjectId,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    userImage1: { type: String },
    userImage2: { type: String },
    userImage3: { type: String },
    commants: [
      {
        userId: {
          type: ObjectId,
          required: true,
        },
        commant: {
          type: String,
          required: true,
        },
      },
    ],
    likes: [
      {
        userId: {
          type: ObjectId,
          required: true,
        },
        likeNum: {
          type: Number,
          required: true,
        },
      },
    ],
    createAt: { type: Date, default: Date.now() },
  },
  { collection: 'stories' },
);

Stories.set('toObject', { getters: true, virtuals: true });

var storieModel = mongoose.model('Stories', Stories);

module.exports = storieModel;
