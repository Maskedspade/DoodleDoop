exports.seed = function(knex, Promise) {
  return knex('events').del()
    .then(function () {
      return Promise.all([
        knex('events').insert({url: "http://www.google.com", title: "Pug Owners Gettogether", description: "A casual hangout for all pug owners", location: "BeaconHill", user_id: 1}),
        knex('events').insert({url: "http://www.yahoo.ca", title: "Yoga in Vic", description: "Yoga all day everyday dood", location: "Modo", user_id: 2}),
        knex('events').insert({url: "http://www.dribbble.com", title: "Single Mom Hangout", description: "Whatever, we hate life.", location: "only at Nick's house", user_id: 3}),
        knex('events').insert({url: "http://www.google.com", title: "Bulldog Owners Gettogether", description: "A casual hangout for all pitbull owners", location: "BeaconHill", user_id: 1})
      ]);
    });
};
