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

        if (!results.find(key => key.email === userEmail)) {
          console.log('email doesnt exist');
          res.send('email doesnt exist');
          return;
        } else {
          if (!results.find(key => key.password === userPassword)) {
            console.log('wrong password');
            res.send('wrong password');
            return;
          } else {
            console.log('success');
            res.send('success');
            return;
          }
        }

    });

  });

  return router;
};
