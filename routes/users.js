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

//LOGIN AND REGISTER DATA GOES IN HERE *******************************
  router.post("/", (req, res) => {
    if (!req.body.form) {
      res.status(400).json({ error: 'invalid request'});
      return;
    }

    if (req.body.form === 'login') {
      const userEmail = req.body.userEmail;
      const userPassword = req.body.userPassword;

      knex
        .select('email', 'password', 'identity')
        .from('users')
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
              req.session.user = results[0]['identity'];  //SET USER COOKIE TO IDENTITY
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

              knex('users')
                .insert({name: userName, email: userEmail, password: userPassword})
                .then(() => {
                  knex
                    .select('identity')
                    .from('users')
                    .then((output) => {
                      req.session.user = output[0]['identity']; //SET USER COOKIE TO IDENTITY
                      res.send('success');
                    });
                });
              return;
            }
          }
        });
      }
  });

  //POST NEW EVENT DATA GOES IN HERE *******************************
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
          const uniqueHostURL = helpers.genHostURL();
          const uniqueGuestURL = helpers.genGuestURL();

        if (req.session.user === undefined) {
          //WRITE GUEST DATA TO SERVER
          const newEventObj = {
            hosturl: uniqueHostURL,
            guesturl: uniqueGuestURL,
            title: eventTitle,
            description: eventDes,
            location: eventLo,
            user_identity: 4,  // GUEST EVENT HOST ASSIGN TO ROOTUSER
          };

          knex('events')
            .insert(newEventObj)
            .then(() => {
              knex
                .select('identity')
                .from('events')
                .where('hosturl', uniqueHostURL)
                .then((results) => {
                  let uniqueTimeslots = [];

                  timeslots.forEach((slot) => {
                    let newObj = {
                      slot: slot,
                      count: 1,  // USE COUNT 1 TO INDICATE "TIMESLOT IS STILL ON"
                      event_identity: results[0]['identity'],
                    };
                    uniqueTimeslots.push(newObj);
                  });

                  let newObjNotGOING = {
                    identity: helpers.genRandomNum(),
                    slot: 'NOT GOING',
                    count: 1,
                    event_identity: results[0]['identity'],
                  };

                  uniqueTimeslots.push(newObjNotGOING);

                  knex('timeslots')
                    .insert(uniqueTimeslots)
                    .then( ()=> {
                      res.json({message: 'success', hostURL: uniqueHostURL});
                    });

                });
            });

        } else {
          //WRITE LOGGED-IN USERS DATA TO SERVER
          knex
            .select('identity')
            .from("users")
            .where('identity', req.session.user)
            .then((results) => {

              const newEventObj = {
                hosturl: uniqueHostURL,
                guesturl: uniqueGuestURL,
                title: eventTitle,
                description: eventDes,
                location: eventLo,
                user_identity: results[0]['identity'],
              };

          knex('events')
            .insert(newEventObj)
            .then(() => {
              knex
                .select('identity')
                .from('events')
                .where('hosturl', uniqueHostURL)
                .then((results) => {
                  let uniqueTimeslots = [];

                  timeslots.forEach((slot) => {
                    let newObj = {
                      slot: slot,
                      count: 1,  // USE COUNT 1 TO INDICATE "TIMESLOT IS STILL ON"
                      event_identity: results[0]['identity'],
                    };
                    uniqueTimeslots.push(newObj);
                  });

                  let newObjNotGOING = {
                    identity: helpers.genRandomNum(),
                    slot: 'NOT GOING',
                    count: 1,
                    event_identity: results[0]['identity'],
                  };

                  uniqueTimeslots.push(newObjNotGOING);

                  knex('timeslots')
                    .insert(uniqueTimeslots)
                    .then( ()=> {
                      res.json({message: 'success', hostURL: uniqueHostURL});
                    });

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
