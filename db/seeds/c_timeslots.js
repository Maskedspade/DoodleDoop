exports.seed = function(knex, Promise) {
  return knex('timeslots').del()
    .then(function () {
      return Promise.all([
        knex('timeslots').insert({slot: "Dec.23.2019, Friday", count: 1, event_identity: 1}),
        knex('timeslots').insert({slot: "Dec.25.2019, Sunday", count: 1, event_identity: 1}),
        knex('timeslots').insert({slot: "NOT GOING", count: 1, event_identity: 1}),
        knex('timeslots').insert({slot: "Feb.02.2019", count: 1, event_identity: 2}),
        knex('timeslots').insert({slot: "NOT GOING", count: 1, event_identity: 2}),
        knex('timeslots').insert({slot: "Fe.bad.2019", count: 1, event_identity: 3}),
        knex('timeslots').insert({slot: "NOT GOING", count: 1, event_identity: 3}),
        knex('timeslots').insert({slot: "a rando day 2019", count: 1, event_identity: 4}),
        knex('timeslots').insert({slot: "NOT GOING", count: 1, event_identity: 4})
      ]);
    });
};
