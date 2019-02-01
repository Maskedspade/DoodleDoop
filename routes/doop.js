"use strict";

const express = require('express');
const router  = express.Router();

// const dataHelper = require("../data-helper");

module.exports = (knex) => {

 router.get("/", (req, res) => {

  if (req.session.user) {
    knex
      .select("*")
      .from("users")
      .where('email', req.session.user)
      .then((results) => {
        const test = results[0]['name'];
        const templateVars ={
          userName: test,
        };
                console.log(test);
  res.render('index', templateVars);
    });
  } else {
    res.redirect('/login');
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

  router.get("/create_event", (req,res) => {
    res.render("create_event");
  });

  return router;
};
