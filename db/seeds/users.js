exports.seed = function(knex, Promise) {
  knex('users').del()
  .then(function () {
    return Promise.all([
      knex('users').insert({name: 'Yuhan freeman', email: 'yh62722@icloud.com', password: 111111}),
      knex('users').insert({name: 'Lindsey Cai', email: 'lindsey.cai94@gmail.com', password: 222222}),
      knex('users').insert({name: 'Nick Leard', email: 'nickleard@gmail.com', password: 333333})
    ])
  });
}
