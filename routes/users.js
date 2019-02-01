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
    if (!req.body) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;

    knex
      .select('email', 'password')
      .from("users")
      .then((results) => {

        results.forEach(key => console.log(key.email, "hey"));
        if (!results.find(key => key.email === userEmail)) {
          res.send('Sorry, this email doesnt exist.');
          return;
        } else {
          if (!results.find(key => key.password === userPassword)) {
            res.send('Sorry, wrong password.');
            return;
          } else {
            res.send('success');
            return;
          }
        }

    });

  });

  return router;
};
