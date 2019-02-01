exports.seed = function(knex, Promise) {
  console.log("users");
  knex('users').del()
  .then(function () {
    return Promise.all([
      knex('users').insert({id: 1, name: 'Yuhan freeman', email: 'yh62722@icloud.com', password: 111111}),
      knex('users').insert({id: 2, name: 'Lindsey Cai', email: 'lindsey.cai94@gmail.com', password: 222222}),
      knex('users').insert({id: 3, name: 'Nick Leard', email: 'nickleard@gmail.com', password: 333333})
    ])
  });
}