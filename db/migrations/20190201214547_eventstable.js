
exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function (t) {
    t.increments('identity');
    t.string('hosturl');
    t.string('guesturl');
    t.string('title');
    t.string('description');
    t.string('location');

    t.integer('user_identity').unsigned();
    t.foreign('user_identity').references('users.identity').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events');
};
