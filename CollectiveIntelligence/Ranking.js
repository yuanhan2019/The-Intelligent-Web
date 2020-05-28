const _ = require('lodash');
let Euclidean = require('./Euclidean');
let Pearson = require('./Pearson');


module.exports = class Rank {

// Returns the best matches for person from the prefs dictionary.
// Number of results and similarity function are optional params.

    topMatches(prefs, person, n = 5, similarity = 'sim_pearson') {

        let scores = [];
        let prefsWithoutPerson = _.omit(prefs, person);
        let num=1;
        _.forIn(prefsWithoutPerson, (value, key) => {
            let score = {
                person: key
            };

            if(num==1) {
                if (similarity === 'sim_pearson') {
                    score.score = Pearson.sim(prefs, person, key);
                    num+=1;
                }
            }
            if (similarity === 'sim_euclidean')
                score.score = Euclidean.sim(prefs, person, key);

            scores.push(score);

        });

        scores = _.reverse(_.sortBy(scores, 'score'));
        scores.length = n;

        return scores;

    }

// Gets recommendations for a person by using a weighted average
// of every other user's rankings

    getRecommendations(prefs, person, similarity = 'sim_pearson') {

        let totals = {};
        let simSums = {};
        //let prefTemp=prefs['users'];
        let personRating;
        //console.log(prefTemp);
        _.forIn(prefs, (value, key) => {
            if(value['userId']==person){
                personRating=value['ratings'];
            }
        });
        console.log(personRating);
        _.forIn(prefs, (value, key) => {
            //console.log(value);
            // console.log(value['userId']);
            // console.log(person);
            if(value['userId']!=person){
                let sim;
                if (similarity === 'sim_pearson')
                    sim = Pearson.sim(prefs, person, key);
                if (similarity === 'sim_euclidean')
                    sim = Euclidean.sim(prefs, person, value['userId']);
                // Ignore scores of zero or lower
                if (sim <= 0) return;
                _.each(value['ratings'], (pref) => {
                    let key = _.values(pref)[0];
                    let keyTemp={
                        storyId:key
                    };
                    let seen = _.some(personRating, keyTemp);
                    if (!seen) {
                        // Similarity * Score
                        if (totals[key] === undefined) totals[key] = 0;
                        totals[key] += _.values(pref)[1] * sim;
                        // Sum of similarities
                        if (simSums[key] === undefined) simSums[key] = 0;
                        simSums[key] += sim;
                    }
                });
            }else{

            }
        });

        let scores = _.map(totals, (value, key) => {
            return {
                story: key,
                score: value / simSums[key]
            }
        });

        scores = _.reverse(_.sortBy(scores, 'score'));

        return scores;

    }
}
// console.log(topMatches(critics, 'Toby', 3));
// console.log(getRecommendations(critics, 'Toby'));
