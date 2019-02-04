# Node Skeleton

## Project Setup

Project Setup skeleton from Lighthouse Labs repo.

## Getting Started

1. Install dependencies: `npm i`
2. Fix to binaries for sass: `npm rebuild node-sass`
3. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
4. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
5. Run the server: `npm run local`
6. Visit `http://localhost:8080/` to go to Home page

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- bcrypt
- body-parser
- cookie-parser
- cookie-session
- ejs
- express
- knex
- knex-logger
- node-sass-middleware
- pg

## Database Breakdown
!['our database setup'](https://github.com/Maskedspade/DoodleDoop/blob/master/docs/data-structure.png)
This is our database Setup.

## Project Showcase

!['Login from Home'](https://github.com/Maskedspade/DoodleDoop/blob/master/docs/Login'.gif)
Logging in fro.m the home page -> starts a cookie session and shows all current user's created events.

!['Creating new events'](https://github.com/Maskedspade/DoodleDoop/blob/master/docs/create-new-event.gif)
Create new events, options include inputting strings and use of a calendar select date and time API.
