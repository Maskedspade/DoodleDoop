"use strict";

const express = require('express');
const router  = express.Router();

const helpers = require('../helpers');


module.exports = (knex) => {

  // router.get("/", (req, res) => {
  //   knex
  //     .select("*")
  //     .from("users")
  //     .then((results) => {
  //       res.json(results);
  //   });
  // });

//LOGIN AND REGISTER DATA GOES IN HERE
  router.post("/", (req, res) => {
    if (!req.body.form) {
      res.status(400).json({ error: 'invalid request'});
      return;
    }

    if (req.body.form === 'login') {
      const userEmail = req.body.userEmail;
      const userPassword = req.body.userPassword;

      knex
        .select('email', 'password')
        .from("users")
        .then((results) => {
          if(!(userEmail && userPassword)) {
            res.send('Cannot be blank.');
            return;
          }
          if (!results.find(key => key.email === userEmail)) {
            res.send('Sorry, this email does not exist.');
            return;
          } else {
            if (!results.find(key => key.password === userPassword)) {
              res.send('Sorry, wrong password.');
              return;
            } else {
              req.session.user = userEmail;  //SET USER COOKIE TO EMAIL
              res.send('success');
              return;
            }
          }
        });
      }

    if (req.body.form === 'registration') {
      const userName = req.body.userName;
      const userEmail = req.body.userEmail;
      const userPassword = req.body.userPassword;
      const userPassword2 = req.body.userPassword2;

      knex
        .select('email')
        .from("users")
        .then((results) => {
          if(!(userEmail && userPassword && userPassword2 && userName)) {
            res.send('Cannot be blank.');
            return;
          }
          if (results.find(key => key.email === userEmail)) {
            res.send('Email already exists');
            return;
          } else {
            if (userPassword !== userPassword2) {
              res.send('Password does not match');
              return;
            } else {
              const uniqueIDForUser = helpers.genRandomNum();

              knex('users')
                .insert({id: uniqueIDForUser, name: userName, email: userEmail, password: userPassword})
                .then(() => {
                  req.session.user = userEmail; //SET USER COOKIE TO EMAIL
                  res.send('success');
                });
              return;
            }
          }
        });
      }
  });

  //POST NEW EVENT DATA GOES IN HERE
  router.post("/new-event", (req, res) => {
    if (req.body.form !== 'new-event') {
      res.status(400).json({ error: 'invalid request'});
      return;
    }

    const eventTitle = req.body.eventTitle;
    const eventDes = req.body.eventDes;
    const eventLo = req.body.eventLo;
    const timeslots = req.body.timeslots;

    const checkForRepeated = (timeslots) => {
      let counts = [];
      for(let i = 0; i <= timeslots.length; i++) {
          if(counts[timeslots[i]] === undefined) {
              counts[timeslots[i]] = 1;
          } else {
              return true;
          }
      }
      return false;
    };

    const checkEmpty = (eventTitle, eventDes, eventLo, timeslots) => {
      if (!eventTitle) {
        return false;
      }
      if (!eventDes) {
        return false;
      }
      if (!eventLo) {
        return false;
      }
      for (let key in timeslots) {
        if (timeslots[key] === undefined) {
          return false;
        }
      }
      if (eventTitle.split(' ').join('') === '') {
        return false;
      }
      if (eventDes.split(' ').join('') === '') {
        return false;
      }
      if (eventLo.split(' ').join('') === '') {
        return false;
      }
      return true;
    };

    if (checkEmpty(eventTitle, eventDes, eventLo, timeslots)) {
      if(checkForRepeated(timeslots)) {
        res.json({message: 'Please make sure all timeslots are unique', hostURL: null});
      } else {

        // INPUTS ALL VALID AND GOOD TO GO INSIDE DATABASE
          const uniqueIDForEvent = helpers.genRandomNum();
          const uniqueHostURL = helpers.genHostURL();
          const uniqueGuestURL = helpers.genGuestURL();

        if (req.session.user === undefined) {
          //WRITE GUEST DATA TO SERVER
          const newEventObj = {
            id: uniqueIDForEvent,
            hosturl: uniqueHostURL,
            guesturl: uniqueGuestURL,
            title: eventTitle,
            description: eventDes,
            location: eventLo,
            user_id: 0,  // ASSIGN USER ID TO ROOTUSER
          };

          let uniqueTimeslots = [];

          timeslots.forEach((slot) => {
            let newObj = {
              id: helpers.genRandomNum(),
              slot: slot,
              count: 1,  // USE COUNT 1 TO INDICATE "TIMESLOT IS STILL ON"
              event_id: uniqueIDForEvent,
            };
            uniqueTimeslots.push(newObj);
          });

          let newObjNotGOING = {
            id: helpers.genRandomNum(),
            slot: 'NOT GOING',
            count: 1,
            event_id: uniqueIDForEvent,
          };

          uniqueTimeslots.push(newObjNotGOING);

          knex('events')
            .insert(newEventObj)
            .then(() => {
              knex('timeslots')
                .insert(uniqueTimeslots)
                .then(() => {
                  res.json({message: 'success', hostURL: uniqueHostURL});
                });
            });

        } else {
          //WRITE LOGGED IN USERS DATA TO SERVER
          knex
            .select('id')
            .from("users")
            .where('email', req.session.user)
            .then((results) => {

              const newEventObj = {
                id: uniqueIDForEvent,
                hosturl: uniqueHostURL,
                guesturl: uniqueGuestURL,
                title: eventTitle,
                description: eventDes,
                location: eventLo,
                user_id: results['id'],
              };

              let uniqueTimeslots = [];

              timeslots.forEach((slot) => {
                let newObj = {
                  id: helpers.genRandomNum(),
                  slot: slot,
                  count: 1, // USE COUNT 1 TO INDICATE "TIMESLOT IS STILL ON"
                  event_id: uniqueIDForEvent,
                };
                uniqueTimeslots.push(newObj);
              });

              let newObjNotGOING = {
                id: helpers.genRandomNum(),
                slot: 'NOT GOING',
                count: 1,
                event_id: uniqueIDForEvent,
              };

              uniqueTimeslots.push(newObjNotGOING);

            knex('events')
              .insert(newEventObj)
              .then(() => {
                knex('timeslots')
                  .insert(uniqueTimeslots)
                  .then(() => {
                    res.json({message: 'success', hostURL: uniqueHostURL});
                  });
              });

          });
        }
      }
    } else {
      res.json({message: 'Please fill all required', hostURL: null});
    }
  });

  return router;
};
