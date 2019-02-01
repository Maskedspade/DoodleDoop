"use strict";

const express = require('express');
const router  = express.Router();

// const dataHelper = require("../data-helper");

module.exports = (knex) => {

 router.get("/", (req, res) => {
    res.render("index");
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

  // router.get("/create_event", (req,res) => {
  //   res.render("create_event");
  // });

  return router;
};
