exports.seed = function(knex, Promise) {
  return knex('timeslots').del()
    .then(function () {
      return Promise.all([
        knex('timeslots').insert({slot: "1/15 01:00 PM - 1/15 04:00 PM", count: 1, event_identity: 1}),
        knex('timeslots').insert({slot: "1/15 09:00 AM - 1/15 11:00 AM", count: 1, event_identity: 1}),
        knex('timeslots').insert({slot: "NOT GOING", count: 1, event_identity: 1}),
        knex('timeslots').insert({slot: "2/05 01:00 PM - 2/05 03:00 PM", count: 1, event_identity: 2}),
        knex('timeslots').insert({slot: "NOT GOING", count: 1, event_identity: 2}),
        knex('timeslots').insert({slot: "1/01 09:00 AM - 1/15 11:00 AM", count: 1, event_identity: 3}),
        knex('timeslots').insert({slot: "NOT GOING", count: 1, event_identity: 3}),
        knex('timeslots').insert({slot: "1/30 01:30 PM - 1/30 04:30 PM", count: 1, event_identity: 4}),
        knex('timeslots').insert({slot: "NOT GOING", count: 1, event_identity: 4})
      ]);
    });
};
