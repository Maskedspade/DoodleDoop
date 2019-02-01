exports.seed = function(knex, Promise) {
  console.log("users");
  knex('users').del()
  .then(function () {
    return Promise.all([
      knex('users').insert({id: 1, name: 'Yuhan Freeman', email: 'yh627220@icloud.com', timeslot_id: 3}),
      knex('users').insert({id: 2, name: 'Sammyyyy', email: 'sammy@gmail.com', timeslot_id: 2}),
      knex('users').insert({id: 3, name: 'Nicolas Cage', email: 'nikcage@icloud.com', timeslot_id: 1}),
      knex('users').insert({id: 4, name: 'Channing Tatum', email: 'ctatum@icloud.com', timeslot_id: 1})
    ]);
  });
};
