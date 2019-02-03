"use strict";

const express = require('express');
const router  = express.Router();

const helpers = require('../helpers');

module.exports = (knex) => {

router.get("/", (req, res) => {

  const templateVars = {};
  let eventList = [];

  if (req.session.user) {
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
  } else {
    templateVars.userStatus = false;
    templateVars.userName = null;
    templateVars.userEmail = null;
    templateVars.userEvents = eventList;

   res.render('index', templateVars);
  }
});


  router.get("/register", (req, res) => {
    res.render("doop_register");
  });

  router.get("/login", (req, res) => {
    res.render("doop_login");
  });

  router.get("/who_is_this", (req, res) => {
    res.render("doop_who_is_this");
  });

  router.get("/create_event", (req, res) => {
    // if (req.session.user) {

      res.render("create_event");
  });

  router.get("/event/:url", (req, res) => {
    res.render("event");
  });

  // router.post("/events", (req, res) => {
  //   res.render("events");
  // });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect('/');
  });

  return router;
};
