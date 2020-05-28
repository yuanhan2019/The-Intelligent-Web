const _ = require('lodash');

module.exports = class Euclidean {

    // Returns a distance-based similarity score for person1 and person2
    static sim(prefs, person1, person2) {
        let ratings1;
        let ratings2;
        _.forIn(prefs, (value, key) => {
            if(value['userId']==person1){
                ratings1=value['ratings'];
            }else if(value['userId']==person2){
                ratings2=value['ratings'];
            }
        });
        // Get the list of shared_items
        let person1Movies = _.map(ratings1, (n) => {
            return _.values(n)[0];
        });
        let person2Movies = _.map(ratings2, (n) => {
            return _.values(n)[0];
        });
        let sharedMovies = _.intersection(person1Movies, person2Movies);

        // If they have no ratings in common, return 0
        if (sharedMovies.length === 0) return 0;

        // Add up the squares of all the differences
        let sum = 0;
        _.forEach(sharedMovies, (value) => {

            let person1Rating = _.values(_.find(ratings1, (e) => {
                if (_.values(e)[0]==value) return _.values(e)[0];
            }))[1];
            let person2Rating = _.values(_.find(ratings2, (e) => {
                if (_.values(e)[0]==value) return _.values(e)[0];
            }))[1];
            let calc = Math.pow(person1Rating - person2Rating, 2);
            sum += calc;
        });

        return 1 / (1 + sum);

    }

}
