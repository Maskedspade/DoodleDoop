"use strict";

const express = require('express');
const router  = express.Router();

const helpers = require('../helpers');


module.exports = (knex) => {

router.post("/", (req, res) => {
  if (!req.body.form) {
    res.status(400).json({ error: 'invalid request'});
    return;
  }

  // update returning guest's decision on timeslot
  if (req.body.form === 'update-timeslot') {
    const timeslotModify = req.body.timeslotModify;
    const respondName = req.body.respondentName;
    const respondEmail = req.body.respondentEmail;
    const guestURL = req.body.guestURL;

   knex
      .select('*')
      .from('events')
      .innerJoin('timeslots', 'events.identity', 'timeslots.event_identity')
      .where('guesturl', guestURL)
      .where('slot', timeslotModify)
      .then((results) => {
        if (results.length > 0) {
          const timeslotID = results[0].identity;
          knex('respondents')
            .where('email', respondEmail)
            .update({
               timeslot_identity: timeslotID,
              })
            .then(() => {
            knex
              .select('*')
              .from('events')
              .innerJoin('timeslots', 'events.identity', 'event_identity')
              .leftOuterJoin('respondents', 'timeslots.identity', 'timeslot_identity')
              .where('events.guesturl', guestURL)
              .then((output)=> { // prepare json to pass into cookie
                const respondSelect = timeslotModify;
                const timeslotsGroup = helpers.createTimeslots(output);

                // setting as none logged-in guest
                const templateVars = helpers.createTempVars(output, timeslotsGroup, false, null, null);

                req.session.templateVars = templateVars; // set cookie for rendering next ejs
                req.session.respondentInfo = [respondName, respondEmail, respondSelect];
                req.session.redirectLink = `/event/${guestURL}`;
                res.send('success');
                });
            });
        } else {
          res.send('Something went wrong. Please try again.');
          return;
        }
      });
  }

  // collecting respondent information before directing them to event_guest ejs
  if (req.body.form === 'identity') {
    let respondentEmail = req.body.email;
    let respondentName = req.body.name;
    let respondentStatus = req.body.status;
    let guestURL = req.body.guestURL;

    if (respondentStatus === 'first-time') {
      knex
        .select("email")
        .from("events")
        .innerJoin('timeslots', 'events.identity', 'event_identity')
        .innerJoin('respondents', 'timeslots.identity', 'timeslot_identity')
        .where('guesturl', guestURL)
        .then((output1) => { // check is first-time guest is actually returning respondent
          if (output1.length > 0) {
            output1.forEach( key => {
              if (key.email === respondentEmail) {
                res.send('Email seems to have existed already for this event. Are you a returning guest?');
              }
            });
          }
          knex
            .select('timeslots.identity') // write new respondent to DB and set default decision to 'NOT GOING'
            .from('events')
            .innerJoin('timeslots', 'events.identity', 'timeslots.event_identity')
            .where('guesturl', guestURL)
            .where('slot', 'NOT GOING')
            .then((results)=>{
              if (results.length > 0) {
                const slotIDByDefault = results[0].identity;
                knex('respondents')
                   .insert({name: respondentName, email: respondentEmail, timeslot_identity: slotIDByDefault})
                   .then(() => {
                      knex
                        .select('*')
                        .from('events')
                        .innerJoin('timeslots', 'events.identity', 'event_identity')
                        .leftOuterJoin('respondents', 'timeslots.identity', 'timeslot_identity')
                        .where('events.guesturl', guestURL)
                        .then((output)=> {
                            const respondSelect = 'NOT GOING';
                            const timeslotsGroup = helpers.createTimeslots(output);

                            // setting as none logged-in guest
                            const templateVars = helpers.createTempVars(output, timeslotsGroup, false, null, null);
                            req.session.templateVars = templateVars; //set cookie for rendering next ejs
                            req.session.respondentInfo = [respondentName, respondentEmail, respondSelect];
                            res.send('success');
                        });
                  });
              } else {
                res.send('Something went wrong.');
              }
            });
        });
    }
    if (respondentStatus === 'returning') {
      knex
        .select('name', 'email', 'slot', 'event_identity')
        .from('respondents')
        .innerJoin('timeslots', 'timeslot_identity', 'timeslots.identity')
        .where('email', respondentEmail)
        .then((results) => {
          if (results.length > 0) {
            const respondSelect = results[0].slot;
            const respondName = results[0].name;
            const respondEmail = results[0].email;
          knex
            .select("*")
            .from("events")
            .innerJoin('timeslots', 'events.identity', 'event_identity')
            .leftOuterJoin('respondents', 'timeslots.identity', 'timeslot_identity')
            .where('guesturl', guestURL)
            .then((output) => {
              if (output.length > 0) {

                const timeslotsGroup = helpers.createTimeslots(output);
                const templateVars = helpers.createTempVars(output, timeslotsGroup, false, null, null);

                req.session.templateVars = templateVars;
                req.session.respondentInfo = [respondName, respondEmail, respondSelect];
                res.send('success');
            } else {
              res.send('Something went wrong. Please try again');
            }
          });
        } else {
          res.send('Cannot find matching email. Please try again.');
        }
      });
    }
  }

  if (req.body.form === 'login') {
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;

      knex
        .select('email', 'password', 'identity')
        .from('users')
        .then((results) => {
          if (!results.find(key => key.email === userEmail)) {
            res.send('Sorry, this email does not exist.');
            return;
          }
          knex
            .select('password', 'identity')
            .from('users')
            .where('email', userEmail)
            .then((output) => {
              if (output[0].password !== userPassword) {
                res.send('Sorry, wrong password.');
              } else if (output[0].password === userPassword) { // set cookie to logged-in user
                req.session.user = output[0].identity;
                res.send('success');
                return;
              } else {
                res.send('Something went wrong. Please try again.');
              }
            });
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
          if (results.find(key => key.email === userEmail)) {
            res.send('Email already exists.');
            return;
          } else {
              knex('users')
                .insert({name: userName, email: userEmail, password: userPassword})
                .then(() => {
                  knex
                    .select('identity')
                    .from('users')
                    .where('email', userEmail)
                    .then((output) => {
                      if (output.length > 0) { // set cookie to newly registered user
                        req.session.user = output[0].identity;
                        res.send('success');
                      } else {
                        res.send('Something went wrong. Please try again.');
                      }
                    });
                });
              return;
          }
        });
      }
});

  //data of posting new event goes in here
  router.post("/new-event", (req, res) => {
    if (req.body.form !== 'new-event') {
      res.status(400).json({ error: 'invalid request'});
      return;
    }

    const eventTitle = req.body.eventTitle;
    const eventDes = req.body.eventDes;
    const eventLo = req.body.eventLo;
    const timeslots = req.body.timeslots;

    const uniqueHostURL = helpers.genHostURL();
    const uniqueGuestURL = helpers.genGuestURL();

    if (req.session.user === undefined) {
      // write guest host and event details to DB
      const newEventObj = {
        hosturl: uniqueHostURL,
        guesturl: uniqueGuestURL,
        title: eventTitle,
        description: eventDes,
        location: eventLo,
        user_identity: 4,  // guest host event ID assigned to root user's
      };

      knex('events')
        .insert(newEventObj)
        .then(() => {
          knex
            .select('identity')
            .from('events')
            .where('hosturl', uniqueHostURL)
            .then((results) => {
              if (results.length > 0) {
                let uniqueTimeslots = [];

                let newObjNotGOING = {
                  slot: 'NOT GOING',
                  count: 1,
                  event_identity: results[0]['identity'],
                };
                uniqueTimeslots.push(newObjNotGOING);

                timeslots.forEach((slot) => {
                  let newObj = {
                    slot: slot,
                    count: 1,  // use count 1 to indicate "ongoing status" of an timeslot
                    event_identity: results[0]['identity'],
                  };
                  uniqueTimeslots.push(newObj);
                });

                knex('timeslots')
                  .insert(uniqueTimeslots)
                  .then( ()=> {
                    res.json({message: 'success', hostURL: uniqueHostURL});
                  });
              } else {
                console.log('database query error');
              }
            });
        });
    } else {
      // write logged-in user and event details to DB
      knex
        .select('identity')
        .from("users")
        .where('identity', req.session.user)
        .then((results) => {
        if (results.length > 0) {
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
                  if (results.length > 0) {
                  let uniqueTimeslots = [];

                  let newObjNotGOING = {
                    slot: 'NOT GOING',
                    count: 1,
                    event_identity: results[0]['identity'],
                  };
                  uniqueTimeslots.push(newObjNotGOING);

                  timeslots.forEach((slot) => {
                    let newObj = {
                      slot: slot,
                      count: 1,  // use count 1 to indicate "ongoing status" of an timeslot
                      event_identity: results[0]['identity'],
                    };
                    uniqueTimeslots.push(newObj);
                  });

                  knex('timeslots')
                    .insert(uniqueTimeslots)
                    .then( ()=> {
                      res.json({message: 'success', hostURL: uniqueHostURL});
                    });
                  } else {
                    console.log('database query error');
                  }
                });
            });
        } else {
          console.log('database query error');
        }
      });
    }
  });

router.post("/modify-event", (req, res) => {
  if (req.body.form !== 'modify-event') {
    res.status(400).json({ error: 'invalid request'});
    return;
  }
  const hostURL = req.body.hostURL.slice(5);
  const eventTitle = req.body.eventTitle;
  const eventDes = req.body.eventDes;
  const eventLo = req.body.eventLo;
  const timeslots = req.body.timeslots;
  const storeOldSlot = req.body.storeOldSlot;

  knex
    .select('identity')
    .from('events')
    .where('hosturl', hostURL)
    .then((output) => {
      if (output.length > 0) {
        const eventID = output[0].identity;

          knex('events')
            .where('hosturl', hostURL)
            .update({
              title: eventTitle,
              description: eventDes,
              location: eventLo,
            })
            .then(() => { // A) if event host only wishes to add new timeslots
              if (timeslots.length > 1 && storeOldSlot.length === 1) {
                let newSlots = [];
                timeslots.slice(1).forEach(item => {
                    const newSlot = {
                      slot: item,
                      count: 1,
                      event_identity: eventID
                    };
                    newSlots.push(newSlot);
                });

                knex('timeslots')
                  .insert(newSlots)
                  .then(() => {
                    req.session.redirectLink = `/host/${hostURL}`;
                    res.send('success');
                    return;
                  });
              }

                // B) if event host only wishes to delete existing timeslots
              if (timeslots.length === 1 && storeOldSlot.length > 1) {

                let prepToFeedRecursion = storeOldSlot.slice(1);
                let counter = prepToFeedRecursion.length - 1;
                // use recursion to chain knex jqueries together
                const callback = (counter) => {
                  if (counter < 0) {
                    req.session.redirectLink = `/host/${hostURL}`;
                    res.send('success');
                    return;
                  } else {
                    let counter1 = counter - 1;
                    knex('timeslots')
                      .update({count: 0}) // bring back the "ongoing status" to 0 to indicate expiry slot
                      .where('slot', prepToFeedRecursion[counter])
                      .then(callback(counter1));
                  }
                };
                callback(counter);
              }

              // C) if event host wishes to delete existing timeslots AND to add new slots
              // ensure slots that are ready to be deleted are not overlapping with those being added in
              if (timeslots.length > 1 && storeOldSlot.length > 1) {
                const siftResult = helpers.siftCommonArray(timeslots.slice(1), storeOldSlot.slice(1));
                const timeslotsUpdate = siftResult[0];
                const storeOldSlotUpdate = siftResult[1];

                // 1) case where after processing the overlaps - still need to update BOTH those to to added and those to be deleted;
                if (timeslotsUpdate.length > 0 && storeOldSlotUpdate.length > 0) {
                  let brandNewSlots = [];
                  timeslotsUpdate.forEach(item => {
                    const brandNewSlot = {
                      slot: item,
                      count: 1,
                      event_identity: eventID
                    };
                    brandNewSlots.push(brandNewSlot);
                  });

                  knex('timeslots')
                    .insert(brandNewSlots)
                    .then(() => {
                        let counter2 = storeOldSlotUpdate.length - 1;
                        const callback2 = (counter2) => {
                          if (counter2 < 0) {
                            req.session.redirectLink = `/host/${hostURL}`;
                            res.send('success');
                            return;
                          } else {
                            let counter3 = counter2 - 1;
                            knex('timeslots')
                              .update({count: 0}) // bring back the "ongoing status" to 0 to indicate expiry slot
                              .where('slot', storeOldSlotUpdate[counter2])
                              .then(callback2(counter3));
                          }
                        };
                        callback2(counter2);
                    });
                }
                // 2) case where after processing the overlaps - only need to update those to be added
                if (timeslotsUpdate.length > 0 && storeOldSlotUpdate.length === 0) {
                  let newSlots = [];
                  timeslotsUpdate.forEach( item => {
                    const newSlot = {
                      slot: item,
                      count: 1,
                      event_identity: eventID
                    };
                    newSlots.push(newSlot);
                  });
                  knex('timeslots')
                    .insert(newSlots)
                    .then(() => {
                      req.session.redirectLink = `/host/${hostURL}`;
                      res.send('success');
                      return;
                  });
                }
                // 3) case where after processing the overlaps - only need to update those to be deleted
                if (storeOldSlotUpdate.length > 0 && timeslotsUpdate.length === 0) {
                  let counter3 = storeOldSlotUpdate.length - 1;
                  const callback3 = (counter3) => {
                    if (counter3 < 0) {
                      req.session.redirectLink = `/host/${hostURL}`;
                      res.send('success');
                      return;
                    } else {
                      let counter4 = counter3 - 1;
                      knex('timeslots')
                        .update({count: 0}) // bring back the "ongoing status" to 0 to indicate expiry
                        .where('slot', storeOldSlotUpdate[counter])
                        .then(callback3(counter4));
                    }
                  };
                  callback3(counter3);
                }
              }
          });
      } else {
        res.send('Something went wrong. Please try again later.')
      }
    });
});

router.post("/delete-event", (req, res) => {
  if (req.body.form !== 'delete-event') {
    res.status(400).json({ error: 'invalid request'});
    return;
  }
  const hostURL = req.body.hostURL.slice(5);

  knex
    .select('events.identity')
    .from ('events')
    .where('hosturl', hostURL)
    .then((results) => {
      if (results.length > 0) {
        const targetEventID = results[0].identity;
        knex('timeslots')
          .update({count: 0}) // bring back "ongoing status" of all slots including "NOT GOING" to 0 to indicate EVENT expired
          .where('event_identity', targetEventID)
          .then(() => {
            req.session.redirectLink = `/host/${hostURL}`;
            res.send('success');
          });
      } else {
        res.send('Something went wrong. Please try again later.')
      }
    });

})

  return router;
};
