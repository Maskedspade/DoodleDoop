
exports.up = function(knex, Promise) {
  return knex.schema.createTable('respondents', function (t) {
    t.integer('id').unique().primary();
    t.string("name");
    t.string("email");

    t.integer('timeslot_id').unsigned();
    t.foreign('timeslot_id').references('timeslots.id').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('respondents');
};
