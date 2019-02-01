"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

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
              req.session.user = userEmail;
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
                .then(() => res.send('success'));
              return;
            }
          }
        });
      }

    if (req.body.form === 'identity') {
      const userIdentity = req.body.userIdentity;

      res.send(req.body.userIdentity);
      console.log(userIdentity);
      }



  });

  return router;
};
