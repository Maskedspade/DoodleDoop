exports.seed = function(knex, Promise) {
  return knex('events').del()
    .then(function () {
      return Promise.all([
        knex('events').insert({identity: 1, hosturl: "yuhansevent", guesturl:"yuhanseventguest", title: "Pug Owners Gettogether", description: "A casual hangout for all pug owners", location: "BeaconHill", user_identity: 1}),
        knex('events').insert({identity: 2, hosturl: "lindseycevent", guesturl: "lindseyceventguest",title: "Yoga in Vic", description: "Yoga all day everyday dood", location: "Modo", user_identity: 2}),
        knex('events').insert({identity: 3, hosturl: "nickseventlala", guesturl: "lalaguestsofnicks",title: "Single Mom Hangout", description: "Whatever, we hate life.", location: "only at Nick's house", user_identity: 3}),
        knex('events').insert({identity: 4, hosturl: "yuhansneweventhaha", guesturl: "yuhansguestlisteventlala", title: "Bulldog Owners Gettogether", description: "A casual hangout for all pitbull owners", location: "BeaconHill", user_identity: 1})
      ]);
    });
};
