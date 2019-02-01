
exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function (t) {
    t.integer('id').unique().primary();
    t.string('url');
    t.string('title');
    t.string('description');
    t.string('location');

    t.integer('user_id').unsigned();
    t.foreign('user_id').references('users.id').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events');
};
