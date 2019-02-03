
exports.up = function(knex, Promise) {
  return knex.schema.createTable('respondents', function (t) {
    t.increments('identity');
    t.string("name");
    t.string("email");

    t.integer('timeslot_identity').unsigned();
    t.foreign('timeslot_identity').references('timeslots.identity').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('respondents');
};
