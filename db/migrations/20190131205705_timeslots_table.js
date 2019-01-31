
exports.up = function(knex, Promise) {
  return knex.schema.createTable('timeslots', function (t) {
    t.increments();
    t.string("slot");
    t.integer("count");

    t.integer('event_id').unsigned();
    t.foreign('event_id').references('events.id').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('timeslots');
};
