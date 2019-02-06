exports.seed = function(knex, Promise) {
  return knex('events').del()
    .then(function () {
      return Promise.all([
        knex('events').insert({hosturl: "yuhansevent", guesturl:"yuhanseventguest", title: "Pug Owners Get-together", description: "Roses are red, violets are blue, pugs are the best, duh. Please come to this casual hangout for all pug owners slash pug lovers in town!", location: "Beacon Hill Park, Victoria, BC", user_identity: 1}),
        knex('events').insert({hosturl: "lindseycevent", guesturl: "lindseyceventguest",title: "Yoga in Victoria", description: "Let's meet over a fun yoga session that allows you to awaken your senses, lighten your spirit and get to know some new friends!! The best part is that you don't have to say Namaste at the end of the session if you really don't want to!!", location: "Modo Yoga Studio, Victoria, BC", user_identity: 2}),
        knex('events').insert({hosturl: "sydneysevent", guesturl: "sydneysevent",title: "Pickup Hockey Game", description: "Come join for a game of hockey at a price of $10. Goalie is free.", location: "Oak Bay Rink, Victoria, BC", user_identity: 3}),
        knex('events').insert({hosturl: "yuhanseventanother", guesturl: "yuhanseventanotherguest", title: "Ukulele Jam Night", description: "Bring your ukulele, meet new friends and play your favourite songs!!", location: "838 Fort Street, Victoria, BC", user_identity: 1})
      ]);
    });
};
