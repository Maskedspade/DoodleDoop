
exports.up = function(knex, Promise) {
  return knex.schema.createTable('timeslots', function (t) {
    t.integer('identity').unique().primary();
    t.string("slot");
    t.integer("count");

    t.integer('event_identity').unsigned();
    t.foreign('event_identity').references('events.identity').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('timeslots');
};
