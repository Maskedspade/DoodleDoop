"use strict";

const express = require('express');
const router  = express.Router();

const helpers = require('../helpers');

module.exports = (knex) => {

  //VISIT HOME PAGE
  router.get("/", (req, res) => {

    if (req.session.user) { //EJS DATA AS LOGGED-IN USER
      const templateVars = {};
      let eventList = [];
      knex
        .select("*")
        .from("users")
        .innerJoin('events', 'users.id', 'events.user_id')
        .where('email', req.session.user)
        .then((results) => {

          templateVars.userStatus = true;
          templateVars.userName = results[0]['name'];
          templateVars.userEmail = results[0]['email'];

          if (results[0]['hosturl'] !== undefined) {
            results.forEach( (key) => {
              let obj = {
                eventTitle: null,
                eventUrl: null,
                eventDes: null,
                eventLo: null,
              };

              obj.eventTitle = key['title'];
              obj.eventUrl = key['hosturl'];
              obj.eventDes = key['description'];
              obj.eventLo = key['location'];

              eventList.push(obj);
            });
          }
          templateVars.userEvents = eventList;

          res.render('index', templateVars);
      });
    } else { //EJS DATA AS GUEST
      const templateVars = {
        userStatus: false,
        userName: null,
        userEmail: null,
        userEvents: [],
      };

     res.render('index', templateVars);
    }

  });

  //LOG-IN LOG-OUT REGISTER BELOW
  router.get("/register", (req, res) => {
    res.render("doop_register");
  });

  router.get("/login", (req, res) => {
    res.render("doop_login");
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect('/');
  });

  router.get("/logout", (req, res) => {
    req.session = null;
    res.redirect('/');
  });

  // CREATE EVENT BELOW
  router.get("/create_event", (req, res) => {
      res.render("create_event");
  });

  // HOST URL BELOW ***********************************************
  router.get("/event/:hostLongURL", (req, res) => {
    const hostURL = req.params.hostLongURL;

    const templateVars = {};

    if (req.session.user) {
      knex
        .select('*')
        .from('events')
        .innerJoin('timeslots', 'events.id', 'timeslots.event_id')
        .innerJoin('users', 'events.user_id', 'user.id')
        .where('hosturl', hostURL)
        .then((results) => {

          // templateVars.userStatus = true;
          // templateVars.userName = resu

    //       console.log(results);

    //   knex
    //     .select("*")
    //     .from("users")
    //     .innerJoin('events', 'users.id', 'events.user_id')
    //     .where('email', req.session.user)
    //     .then((results) => {

    //       templateVars.userStatus = true;
    //       templateVars.userName = results[0]['name'];
    //       templateVars.userEmail = results[0]['email'];

    //       if (results[0]['hosturl'] !== undefined) {
    //         results.forEach( (key) => {
    //           let obj = {
    //             eventTitle: null,
    //             eventUrl: null,
    //             eventDes: null,
    //             eventLo: null,
    //           };

    //           obj.eventTitle = key['title'];
    //           obj.eventUrl = key['hosturl'];
    //           obj.eventDes = key['description'];
    //           obj.eventLo = key['location'];

    //           eventList.push(obj);
    //         });
    //       }
    //       templateVars.userEvents = eventList;

    //       res.render('index', templateVars);
    //   });
    // } else {
    //   templateVars.userStatus = false;
    //   templateVars.userName = null;
    //   templateVars.userEmail = null;
    //   templateVars.userEvents = eventList;
    // knex
    //   .select('*')
    //   .from('events')
    //   .innerJoin('timeslots', 'events.id', 'timeslots.event_id')
    //   .innerJoin('respondents', 'timeslots.id', 'respondents.timeslot_id')
    //   .where('hosturl', hostURL)
    //   .then((results) => {
    //     console.log(results);

    //     res.render("event");
    //   });

      });
    }
  });

  // SHORT URL BELOW ***********************************************
  router.get("/event/:guestShortURL", (req, res) => {
    const guestURL = req.params.guestShortURL;
    const templateVars = {};

      knex
        .select('hosturl', 'user_id')
        .from('events')
        .where('guesturl', guestURL)
        .then((results) => {
          if (results[0]['id']) {

            if (req.session.user) {
              if (req.session.user === results[0]['user_id']) {
                res.redirect(`/event/${results[0]['longurl']}`);
              }

              templateVars.userStatus = true;

              knex
                .select("*")
                .from("users")
                .innerJoin('events', 'users.id', 'events.user_id')
                .where('id', req.session.user)
                .then((results) => {
                  templateVars.userName = results[0]['name'];
                  templateVars.userEmail = results[0]['email'];

                  let eventList = [];

                  if (results[0]['hosturl'] !== undefined) {
                    results.forEach( (key) => {
                      let obj = {
                        eventTitle: null,
                        eventUrl: null,
                        eventDes: null,
                        eventLo: null,
                      };

                      obj.eventTitle = key['title'];
                      obj.eventUrl = key['hosturl'];
                      obj.eventDes = key['description'];
                      obj.eventLo = key['location'];

                      eventList.push(obj);
                    });
                  }

                  templateVars.userEvents = eventList;

                  templateVars.guestURL = guestURL;
                  res.render("doop_who_is_this", templateVars);
                });

            } else {
              templateVars.userStatus = false;
              templateVars.userName = null;
              templateVars.userEmail = null;
              templateVars.userEvents = [];

              templateVars.guestURL = guestURL;
              res.render("doop_who_is_this", templateVars);
            }

          }

          if (!results[0]['id']) {
            res.render("no_events_found");
          }

        });
  });


  return router;

};
