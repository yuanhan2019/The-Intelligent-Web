var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Comments = new Schema(
  {
    comment: {
      type: String,
      required: true,
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
    collection: 'comment',
  },
);

Comments.set('toObject', { getters: true, virtuals: true });

var commentModel = mongoose.model('Comments', Comments);

module.exports = commentModel;
