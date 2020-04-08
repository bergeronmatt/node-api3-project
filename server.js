const express = require('express');

const server = express();

// initialize the logger middleware
server.use(logger);


// Sanity Test
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


//custom middleware

// logger logs to the console the following information about each request:
// request method
// request url
// timestamp
// will run on every request made to the API
function logger(req, res, next) {
  //Timestamp
  req.requestTime = Date();

  //console log the request method to the request url at the requested timestamp
  console.log(`${req.method} to ${req.originalUrl} at ${req.requestTime}`);

  //push the next middleware in the que
  next();
}

module.exports = server;
