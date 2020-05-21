var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Ratings = new Schema(
    {
        username: {type: String},
        story:{ type: String},
        rating:{ type: String}

    }, {collection: 'ratings'}
);

Ratings.set('toObject', { getters: true, virtuals: true });

var ratingModel = mongoose.model('Ratings', Ratings);

module.exports = ratingModel;