
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (t) {
    t.integer('identity').unique().primary();
    t.string('name');
    t.string('email').unique();
    t.string('password');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
