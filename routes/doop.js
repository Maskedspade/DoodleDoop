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
        .innerJoin('events', 'users.identity', 'events.user_identity')
        .where('users.identity', req.session.user)
        .then((results) => {

        if (results.length > 0) {

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
          } else {
            res.send('ERROR');
          }
          templateVars.userEvents = eventList;

          res.render('index', templateVars);
        }
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

  router.get("/event_guest", (req, res) => {
      res.render("event_guest");
  });

  // // HOST URL BELOW ***********************************************
  router.get("/host/:hostLongURL", (req, res) => {
    const hostURL = req.params.hostLongURL;
    const templateVars = {};
})


  // SHORT URL BELOW ***********************************************
  router.get("/event/:guestShortURL", (req, res) => {
    const guestURL = req.params.guestShortURL;
    const templateVars = {};

      knex
        .select('*')
        .from('events')
        .where('guesturl', guestURL)
        .then((results) => {

          console.log(results[0]);

        // ERROR HANDLING IF DATA NOT PRESENT IN DB
        if (results.length > 0) {

            if (req.session.user) {
              //WHEN LOGGED-IN USER VISIT HIS OWN GUEST URL
              if (req.session.user === results[0]['user_identity']) {
                res.redirect(`/event/${results[0]['longurl']}`);
                return;
              }

              //WHEN LOGGED-IN USER VISIT SOMEONE ELSE'S GUEST URL
              templateVars.userStatus = true;

              knex
                .select("*")
                .from("users")
                .innerJoin('events', 'users.identity', 'events.user_identity')
                .where('users.identity', req.session.user)
                .then((results) => {

                  if (results.length > 0) {

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
                } else {
                  res.send('ERROR');
                }
              });

            } else {
              //WHEN GUEST VISIT GUEST URL
              templateVars.userStatus = false;
              templateVars.userName = null;
              templateVars.userEmail = null;
              templateVars.userEvents = [];

              templateVars.guestURL = guestURL;
              res.render("doop_who_is_this", templateVars);
            }

          //WHEN SHORT URL DOES NOT EXIST IN DB
        } else {
          res.render("no_events_found");
        }
      });
  });


  return router;

};
