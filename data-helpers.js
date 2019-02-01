// module.exports = (function makeDataHelpers(knex) {
//   return {

// const helper) = {
//     escape: (str) => {
//       let div = document.createElement('div');
//       div.appendChild(document.createTextNode(str));
//       return div.innerHTML;
//     },

//     calcDaysAgo: (timestamp) => {
//       const date = new Date();
//       let num = (date.getTime() - timestamp) / (1000 * 3600 * 24);
//       let text = '';
//       const years = Math.floor(num / 365);
//       if (years) {
//         text += years;
//         if (years <=1) {text += ' year ';} else {text +=' years ';}
//       }
//       const months = Math.floor(num % 365 / 30);
//       if (months) {
//         text += months;
//         if (months <=1) {text += ' month ';} else {text +=' months ';}
//       }
//       const days = Math.floor(num % 30);
//       if (days) {
//         text += days;
//         if (days <=1) {text += ' day ';} else {text +=' days ';}
//       }
//       if (text !== '') {return text + 'ago';}
//       return 'today';
//     },
//   };





// function generateRandomString(digit) {
//   let text = '';
//   let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   for (let i = 0; i < digit; i ++) {
//     text = text + possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// }

// function generateRandomID() {
//   return 'b' + generateRandomString(3);
// }

// function generateRandomURL() {
//   return 'b' + generateRandomString(5);
// }

// function validateEmail(email) {
//   let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// }

// function validateURL(str) {
//   regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
//   if (regexp.test(str)) {
//     return true;
//   } else {
//     return false;
//   }
// }



//     //SAVE NEW TWEET TO DB
//     selectUniversal: (entity) => {
//       knex
//         .select("*")
//         .from(entity)
//         .then((results) => {
//           res.json(results);
//       });
//     },

//     //GET ALL TWEETS IN DB, SORT BY NEWEST FIRST
//     getTweets: (callback) => {
//         const sortNewestFirst = (a, b) => {
//           return a.created_at - b.created_at;
//         };

//         db.collection("tweets").find().toArray((err, tweets) => {
//           if (err) {
//             callback(err);
//           }
//           callback(null, tweets.sort(sortNewestFirst));
//         });
//     },

//     //REFRESH INITIAL DATABASE
//     remGenTweets: (callback) => {
//         const filterGen = (key) => {
//           return key.created_at > 1470000000000;
//         };

//         db.collection("tweets").find().toArray((err, tweets) => {
//           if (err) {
//             callback(err);
//           }
//           callback(null, tweets.filter(filterGen));
//         });
//     },

//   };
// };
