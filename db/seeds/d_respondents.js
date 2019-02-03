exports.seed = function(knex, Promise) {
  return knex('respondents').del()
  .then(function () {
    return Promise.all([
      knex('respondents').insert({identity: 1, name: 'Yuhan Freeman', email: 'yh627220@icloud.com', timeslot_identity: 3}),
      knex('respondents').insert({identity: 2, name: 'Sammyyyy', email: 'sammy@gmail.com', timeslot_identity: 2}),
      knex('respondents').insert({identity: 3, name: 'Nicolas Cage', email: 'nikcage@icloud.com', timeslot_identity: 1}),
      knex('respondents').insert({identity: 4, name: 'Channing Tatum', email: 'ctatum@icloud.com', timeslot_identity: 1})
    ]);
  });
};
