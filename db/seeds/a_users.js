exports.seed = function(knex, Promise) {
  knex('users').del()
  .then(function () {
    return Promise.all([
      knex('users').insert({identity: 1, name: 'Yuhan Freeman', email: 'yh627220@icloud.com', password: 111111}),

      knex('users').insert({identity: 2, name: 'Lindsey Cai', email: 'lindsey.cai94@gmail.com', password: 222222}),

      knex('users').insert({identity: 3, name: 'Nick Leard', email: 'nickleard@gmail.com', password: 333333}),

      knex('users').insert({identity: 0, name: 'rootuser',email: 'rootuser@gmail.com', password: 0})
    ]);
  });
};
