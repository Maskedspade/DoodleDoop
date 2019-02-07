exports.seed = function(knex, Promise) {
  return knex('respondents').del()
  .then(function () {
    return Promise.all([
      knex('respondents').insert({name: 'Yuhan Freeman', email: 'yh627220@icloud.com', timeslot_identity: 3}),
      knex('respondents').insert({name: 'Richard Feynman', email: 'richardfeynman@gmail.com', timeslot_identity: 2}),
      knex('respondents').insert({name: 'Nick Cage', email: 'nickcage@gmail.com', timeslot_identity: 1}),
      knex('respondents').insert({name: 'Channing Tatum', email: 'channingtatum@gmail.com', timeslot_identity: 1}),
      knex('respondents').insert({name: 'Sheldon Cooper', email: 'sheldoncooper@gmail.com', timeslot_identity: 1}),
      knex('respondents').insert({name: 'Mr Burns', email: 'mrburns@gmail.com', timeslot_identity: 4}),
      knex('respondents').insert({name: 'Homer Simpson', email: 'homersimpson@gmail.com', timeslot_identity: 4}),
      knex('respondents').insert({name: 'Lisa Simpson', email: 'lisasimpson@gmail.com', timeslot_identity: 4}),
    ]);
  });
};
