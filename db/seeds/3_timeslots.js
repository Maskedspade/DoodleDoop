exports.seed = function(knex, Promise) {
  return knex('timeslots').del()
    .then(function () {
      return Promise.all([
        knex('timeslots').insert({id: 1, slot: "Dec.23.2019, Friday", count: 0, event_id: 1}),
        knex('timeslots').insert({id: 2, slot: "Dec.25.2019, Sunday", count: 0, event_id: 1}),
        knex('timeslots').insert({id: 3, slot: "NOT GOING", count: 0, event_id: 1}),
        knex('timeslots').insert({id: 4, slot: "Feb.02.2019", count: 1, event_id: 2}),
        knex('timeslots').insert({id: 5, slot: "NOT GOING", count: 1, event_id: 2}),
        knex('timeslots').insert({id: 6, slot: "Fe.bad.2019", count: 1, event_id: 3}),
        knex('timeslots').insert({id: 7, slot: "NOT GOING", count: 1, event_id: 3}),
        knex('timeslots').insert({id: 8, slot: "a rando day 2019", count: 1, event_id: 4}),
        knex('timeslots').insert({id: 9, slot: "NOT GOING", count: 1, event_id: 4})
      ]);
    });
};
