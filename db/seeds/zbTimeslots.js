exports.seed = function(knex, Promise) {
  return knex('timeslots').del()
    .then(function () {
      return Promise.all([
        knex('timeslots').insert({slot: "Dec.23.2019, Friday", count: 0, event_id: 2}),
        knex('timeslots').insert({slot: "NOT GOING", count: 0, event_id: 3}),
        knex('timeslots').insert({slot: "Feb.02.2019", count: 1, event_id: 2}),
      ]);
    });
};
