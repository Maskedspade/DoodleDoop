exports.seed = function(knex, Promise) {
  return knex('respondents').del()
  .then(function () {
    return Promise.all([
      knex('respondents').insert({id: 1, name: 'Yuhan Freeman', email: 'yh627220@icloud.com', timeslot_id: 3}),
      knex('respondents').insert({id: 2, name: 'Sammyyyy', email: 'sammy@gmail.com', timeslot_id: 2}),
      knex('respondents').insert({id: 3, name: 'Nicolas Cage', email: 'nikcage@icloud.com', timeslot_id: 1}),
      knex('respondents').insert({id: 4, name: 'Channing Tatum', email: 'ctatum@icloud.com', timeslot_id: 1})
    ]);
  });
};
