var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Stories = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      ref: 'user',
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
