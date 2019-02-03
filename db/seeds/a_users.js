exports.seed = async function(knex, Promise) {
  await knex('users').del();
  await knex.raw('ALTER SEQUENCE users_identity_seq RESTART WITH 1');

  await knex('users').insert({name: 'Yuhan Freeman', email: 'yh627220@icloud.com', password: 111111});

  await knex('users').insert({name: 'Lindsey Cai', email: 'lindsey.cai94@gmail.com', password: 222222});

  await knex('users').insert({name: 'Nick Leard', email: 'nickleard@gmail.com', password: 333333});

  await knex('users').insert({name: 'rootuser',email: 'rootuser@gmail.com', password: 0});
};
