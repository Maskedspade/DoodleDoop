exports.seed = function(knex, Promise) {
  return knex('events').del()
    .then(function () {
      return Promise.all([
        knex('events').insert({hosturl: "yuhansevent", guesturl:"yuhanseventguest", title: "Pug Owners Gettogether", description: "A casual hangout for all pug owners", location: "BeaconHill", user_identity: 1}),
        knex('events').insert({hosturl: "lindseycevent", guesturl: "lindseyceventguest",title: "Yoga in Vic", description: "Yoga all day everyday dood", location: "Modo", user_identity: 2}),
        knex('events').insert({hosturl: "nickseventlala", guesturl: "lalaguestsofnicks",title: "Single Mom Hangout", description: "Whatever, we hate life.", location: "only at Nick's house", user_identity: 3}),
        knex('events').insert({hosturl: "yuhansneweventhaha", guesturl: "yuhansguestlisteventlala", title: "Bulldog Owners Gettogether", description: "A casual hangout for all pitbull owners", location: "BeaconHill", user_identity: 1})
      ]);
    });
};
