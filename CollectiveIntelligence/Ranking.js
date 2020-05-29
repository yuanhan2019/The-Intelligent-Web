const _ = require('lodash');
let Euclidean = require('./Euclidean');



module.exports = class Rank {


// Gets recommendations for a person by using a weighted average
// of every other user's rankings

    getRecommendations(prefs,stories, person, n,similarity = 'sim_pearson') {

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
        //console.log(personRating);
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
            }
        });
        let text;
        let userId;
        let scores = _.map(totals, (value, key) => {
            //console.log("story: ", key);

            _.forIn(stories, (value1, key1) => {
                if(value1['storyId']==key){
                    text=value1['text'];
                    userId=value1['userId'];
                }
            });
            return {
                username: userId,
                storyId: key,
                text: text,
                score: value / simSums[key]
            }
        });

        scores = _.reverse(_.sortBy(scores, 'score'));
        if(n==''){
            n=10;
        }
        scores.length = n;
        return scores;

    }
}
// console.log(topMatches(critics, 'Toby', 3));
// console.log(getRecommendations(critics, 'Toby'));
