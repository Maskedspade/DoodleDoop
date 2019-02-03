exports.seed = function(knex, Promise) {
  return knex('events').del()
    .then(function () {
      return Promise.all([
        knex('events').insert({id: 1, hosturl: "yuhansevent", guesturl:"yuhanseventguest", title: "Pug Owners Gettogether", description: "A casual hangout for all pug owners", location: "BeaconHill", user_id: 1}),
        knex('events').insert({id: 2, hosturl: "lindseycevent", guesturl: "lindseyceventguest",title: "Yoga in Vic", description: "Yoga all day everyday dood", location: "Modo", user_id: 2}),
        knex('events').insert({id: 3, hosturl: "nickseventlala", guesturl: "lalaguestsofnicks",title: "Single Mom Hangout", description: "Whatever, we hate life.", location: "only at Nick's house", user_id: 3}),
        knex('events').insert({id: 4, hosturl: "yuhansneweventhaha", guesturl: "yuhansguestlisteventlala", title: "Bulldog Owners Gettogether", description: "A casual hangout for all pitbull owners", location: "BeaconHill", user_id: 1})
      ]);
    });
};
