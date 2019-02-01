module.exports = function makeDataHelpers(knex) {
  return {

    //SAVE NEW TWEET TO DB
    selectUniversal: (entity) => {
      knex
        .select("*")
        .from(entity)
        .then((results) => {
          res.json(results);
      });
    },

    //GET ALL TWEETS IN DB, SORT BY NEWEST FIRST
    getTweets: (callback) => {
        const sortNewestFirst = (a, b) => {
          return a.created_at - b.created_at;
        };

        db.collection("tweets").find().toArray((err, tweets) => {
          if (err) {
            callback(err);
          }
          callback(null, tweets.sort(sortNewestFirst));
        });
    },

    //REFRESH INITIAL DATABASE
    remGenTweets: (callback) => {
        const filterGen = (key) => {
          return key.created_at > 1470000000000;
        };

        db.collection("tweets").find().toArray((err, tweets) => {
          if (err) {
            callback(err);
          }
          callback(null, tweets.filter(filterGen));
        });
    },

  };
};
