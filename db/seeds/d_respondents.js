exports.seed = function(knex, Promise) {
  return knex('respondents').del()
  .then(function () {
    return Promise.all([
      knex('respondents').insert({name: 'Yuhan Freeman', email: 'yh627220@icloud.com', timeslot_identity: 3}),
      knex('respondents').insert({name: 'Sammyyyy', email: 'sammy@gmail.com', timeslot_identity: 2}),
      knex('respondents').insert({name: 'Nicolas Cage', email: 'nikcage@icloud.com', timeslot_identity: 1}),
      knex('respondents').insert({name: 'Channing Tatum', email: 'ctatum@icloud.com', timeslot_identity: 1})
    ]);
  });
};
