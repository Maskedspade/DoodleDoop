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
    req.session.user = null;
    res.redirect('/');
  });

  router.get("/logout", (req, res) => {
    req.session.user = null;
    res.redirect('/');
  });

  router.get("/submitted", (req,res) => {
    res.render("submitted");
  })
  // create event
  router.get("/create_event", (req, res) => {
    const templateVars = {};
    if (req.session.user) {
      knex
        .select('*')
        .from("users")
        .where('users.identity', req.session.user)
        .then((results) => {
          if (results.length > 0) {
            templateVars.userStatus = true;
            templateVars.userName = results[0]['name'];
            templateVars.userEmail = results[0]['email'];

            res.render('create_event', templateVars);
            return;
          } else {
            templateVars.userStatus = false;
            templateVars.userName = null;
            templateVars.userEmail = null;

            res.render('create_event', templateVars);
          }
        });
    } else {
        templateVars.userStatus = false;
        templateVars.userName = null;
        templateVars.userEmail = null;

        res.render('create_event', templateVars);
    }
  });

  // HOST URL BELOW ***********************************************
  router.get("/host/:hostLongURL", (req, res) => {
    const hostURL = req.params.hostLongURL;

    knex
      .select('hosturl', 'identity')
      .from('events')
      .where('hosturl', hostURL)
      .then((results) => {

      // ERROR HANDLING IF DATA NOT PRESENT IN DB
      if (results.length > 0) {
        knex
          .select("*")
          .from("events")
          .innerJoin('timeslots', 'events.identity', 'event_identity')
          .leftOuterJoin('respondents', 'timeslots.identity', 'timeslot_identity')
          .where('events.hosturl', hostURL)
          .then((results) => {

        if (results.length > 0) {
          let timeslotsGroup = {};

          results.forEach(key => {
            if (!timeslotsGroup[key.slot]) {
              timeslotsGroup[key.slot] = [];
              timeslotsGroup[key.slot].push([key['name'], key['email']]);
            } else {
              timeslotsGroup[key.slot].push([key['name'], key['email']]);
            }
          });

          const templateVars = {
            hostURL: results[0]['hosturl'],
            guestURL: results[0]['guesturl'],
            title: results[0]['title'],
            description: results[0]['description'],
            location: results[0]['location'],
            timeslotsGroup: timeslotsGroup,
          };

          if (req.session.user) {
            knex
              .select('*')
              .from('users')
              .where('users.identity', req.session.user)
              .then((results) => {
                if (results.length > 0) {
                  templateVars.userStatus = true;
                  templateVars.userName = results[0]['name'];
                  templateVars.userEmail = results[0]['email'];
                  res.render('event', templateVars);
                } else {
                  res.send('ERROR');
                }
              });

          } else {
            templateVars.userStatus = false;
            templateVars.userName = null;
            templateVars.userEmail = null;
            res.render('event', templateVars);
          }
        } else {
          res.send('ERROR');
        }

      });
        //WHEN HOST URL DOES NOT EXIST IN DB
      } else {
        res.render("no_events_found");
      }
    });
  });

  // SHORT URL BELOW ***********************************************
  router.get("/event/:guestShortURL", (req, res) => {
    const guestURL = req.params.guestShortURL;

    if (req.session.templateVars && req.session.respondentInfo) {
      const templateVars = req.session.templateVars;
      const respondentInfo = req.session.respondentInfo;

      templateVars.userName = respondentInfo[0];
      templateVars.userEmail = respondentInfo[1];
      templateVars.userSelect = respondentInfo[2];

      req.session.templateVars = null;
      req.session.respondentInfo = null;
      console.log(templateVars);

      res.render('event_guest', templateVars);
    } else {
      knex
        .select('user_identity', 'hosturl')
        .from('events')
        .where('guesturl', guestURL)
        .then((results) => {

        // ERROR HANDLING IF DATA NOT PRESENT IN DB
        if (results.length > 0) {
          const templateVars = {};

          if (!req.session.user) {
            templateVars.userStatus = false;
            templateVars.userName = null;
            templateVars.userEmail = null;

            templateVars.guestURL = guestURL;
            res.render('doop_who_is_this', templateVars);
            return;
          }
          if (req.session.user) { //LOGGED-IN USER REDIRECTED TO HOST PAGE WHEN TRYING TO ACCESS OWN GUEST PAGE
            if (results[0]['user_identity'] === req.session.user) {
              res.redirect(`/host/${results[0]['hosturl']}`);
              return;

            } else {
              knex
                .select('*')
                .from("users")
                .where('users.identity', req.session.user)
                .then((results) => {
                  templateVars.userStatus = true;
                  templateVars.userName = results[0]['name'];
                  templateVars.userEmail = results[0]['email'];

                  templateVars.guestURL = guestURL;
                  res.render('doop_who_is_this', templateVars);
                  return;
                });
            }
          }
        //WHEN GUEST URL DOES NOT EXIST IN DB
        } else {
          res.render("no_events_found");
        }
      });
    }
  });

  router.post("/event/:guestShortURL", (req, res) => {
    const respondentInfo = req.body.respondentInfo;
    const templateVarsChild = req.body.templateVars;

    let templateVars = {};
    for (let key in templateVarsChild) {
      templateVars[key] = templateVarsChild[key];
    }
    templateVars.userName = respondentInfo[0];
    templateVars.userEmail = respondentInfo[1];
    templateVars.userSelect = respondentInfo[2];

    console.log(templateVars);
    return;

  });

  router.get("/event/:guestShortURL", (req, res) => {
    const respondentInfo = req.body.respondentInfo;
    const templateVarsChild = req.body.templateVars;

    return;

  });

  return router;

};
