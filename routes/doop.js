"use strict";

const express = require('express');
const router  = express.Router();

const helpers = require('../helpers');

module.exports = (knex) => {

  router.get("/", (req, res) => {
    if (req.session.user) { // recognize logged-in user and prepare data to render ejs
      const templateVars = {};
      let eventList = [];

      knex
        .select("*")
        .from("users")
        .leftOuterJoin('events', 'users.identity', 'events.user_identity')
        .where('users.identity', req.session.user)
        .then((results) => {

        if (results.length > 0) {
          templateVars.userStatus = true;
          templateVars.userName = results[0].name;
          templateVars.userEmail = results[0].email;

          eventList = [];
          results.forEach((key) => {
            if (key.hosturl) {
              let obj = {
                eventTitle: null,
                eventUrl: null,
                eventDes: null,
                eventLo: null,
              };
              obj.eventTitle = key.title;
              obj.eventUrl = key.hosturl;
              obj.eventDes = key.description;
              obj.eventLo = key.location;
              eventList.push(obj);
            }
          });
          templateVars.userEvents = eventList;
          res.render('index', templateVars);
        } else {
          res.session = null;
          res.send('Something went wrong. Please click <a href="/">here</a> to go back to home page');
        }
      });
    }
    if (!req.session.user) {
       const templateVars = {
        userStatus: false,
        userName: null,
        userEmail: null,
        userEvents: [],
      };
      res.render('index', templateVars);
    }
  });

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
    const redirectLink = req.session.redirectLink;
    const templateVars = {
      redirectLink: redirectLink,
    };
    req.session.redirectLink = null;
    res.render("submitted", templateVars);
  });

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
            templateVars.userName = results[0].name;
            templateVars.userEmail = results[0].email;

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

  router.get("/host/:hostLongURL", (req, res) => {
    const hostURL = req.params.hostLongURL;

    knex
      .select('hosturl', 'identity')
      .from('events')
      .where('hosturl', hostURL)
      .then((results) => {

      // error handling if data is not present in DB
      if (results.length > 0) {
        knex
          .select("*")
          .from("events")
          .innerJoin('timeslots', 'events.identity', 'event_identity')
          .leftOuterJoin('respondents', 'timeslots.identity', 'timeslot_identity')
          .where('events.hosturl', hostURL)
          .then((results) => {

              if (results.length > 0) {
                const timeslotsGroup = helpers.createTimeslots(results);
                if (req.session.user) {
                   knex
                    .select('*')
                    .from('users')
                    .where('users.identity', req.session.user)
                    .then((output) => {
                      if (output.length > 0) {
                        const userStatus = true;
                        const userName = output[0].name;
                        const userEmail = output[0].email;

                        const templateVars = helpers.createTempVars(results, timeslotsGroup, userStatus, userName, userEmail);
                        if (helpers.checkLengthForObj(timeslotsGroup) > 0) {
                          res.render('event', templateVars);
                        } else {
                          res.render('event_deleted', templateVars);
                        }

                      } else {
                        res.session = null;
                        res.send('Something went wrong. Please click <a href="/">here</a> to go back to home page');
                      }
                    });
                }
                if (!req.session.user) {
                  const templateVars = helpers.createTempVars(results, timeslotsGroup, false, null, null);
                  if (helpers.checkLengthForObj(timeslotsGroup) > 0) {
                    res.render('event', templateVars);
                  } else {
                    res.render('event_deleted', templateVars);
                  }

                }
              } else {
                res.status(400).json({ error: 'invalid request'});
                return;
              }
        });
      } else {
        res.render("no_events_found");
      }
    });
  });

  router.get("/event/:guestShortURL", (req, res) => {
    const guestURL = req.params.guestShortURL;

    if (req.session.templateVars && req.session.respondentInfo) {
      const templateVars = req.session.templateVars;
      const respondentInfo = req.session.respondentInfo;

      templateVars.respondentName = respondentInfo[0];
      templateVars.respondentEmail = respondentInfo[1];
      templateVars.respondentSelect = respondentInfo[2];

      req.session.templateVars = null;
      req.session.respondentInfo = null;

      res.render('event_guest', templateVars);
    } else {
      knex
        .select('user_identity', 'hosturl')
        .from('events')
        .where('guesturl', guestURL)
        .then((results) => {
            // error handling if data is not present
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
                // when logged-in user trying to access his own guest page
              if (req.session.user) {
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
                      templateVars.userName = results[0].name;
                      templateVars.userEmail = results[0].email;

                      templateVars.guestURL = guestURL;
                      res.render('doop_who_is_this', templateVars);
                      return;
                    });
                }
              }
          } else { // when attempted guest url is not present in DB
            req.session = null;
            res.render("no_events_found");
          }
        });
    }
  });

  return router;

};
