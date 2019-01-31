
exports.up = function(knex, Promise) {
  return Promise.all ([
    knex.schema.table('users', function(t) {
      t.string('email').unique();
      t.string('password');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropColumn('email'),
    knex.schema.dropColumn('password')
  ]);
};
