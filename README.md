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

Database Migrations:
1. Create 'Users' table
2. Create 'Events' table 
3. Create 'Timeslots' table
4. Create 'Respondents' table

Logic: One-to-many Relations
  - Each user can have multiple events.
  - Each event can have multiple timeslots -> We store users' choice + a by default it generates a "NOT GOING" timeslot to keep track of the number of people going on certain times/not going.
  - Each Timeslots can have multiple respondents.

## Project Showcase

!['Login from Home'](https://github.com/Maskedspade/DoodleDoop/blob/master/docs/Login'.gif)
Logging in fro.m the home page -> starts a cookie session and shows all current user's created events.

!['Creating new events'](https://github.com/Maskedspade/DoodleDoop/blob/master/docs/create-new-event.gif)
Create new events, options include inputting strings and use of a calendar select date and time API.

## Test Our Site As...

  ### A first time user who doesn't want to register but still want the service: 
    - Index: Create an Event + 
    - New Event Page: Fill out the event form, various error messages may be thrown (e.g. timeslots cannot be the same, cannot leave blanks, etc.)
    - Generated Event Page: 
      1. user will be automatically considered as a host
      2. user will be given a secret host link which they need to save in order to check back on the event
      3. user will be given a guest link which they can share with guests
    - Secret Host Page: user can modify their own event(can toggle edit and save). Changes will override old version and show on both host and guest links.

  ### A guest who receives a guest link from the event host
    - Who-Is-This Page: 
      1. This is to find out if it's the first time the guest is responding to the event invitation
      2. The "first-time-guest" option takes the guest's name and email, and saves them for later use and guest validation
      3. The "returning-guest" option takes in the guest's email, and if it's in the database, then guest gets sent to the guest page
    - Guest Event Page: 
      1. The first-time guest will see number of respondents in each timeslot; choose the timeslot(s) that works for them, or choose to not go (which will disable all timeslot options); and save response
      2. The returning guest will see the same as first-timers but also their own previous choice.

  ### A returning user that has an account with DoodleDoop: 
    (we highly recommend for people to register as a user cause they won't have to keep track of their own events url themselves)
    - Login
    - Index: shows all events they have created, and can "View" each event
    - Generated Event Page: (see first time user who creates events)





