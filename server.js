const express = require('express');
//initialize router objects
const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');

const server = express();

//initialize middleware
server.use(express.json());
// initialize the logger middleware
server.use(logger); //runs properly


//initialize endpoints from userRouter.js
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);


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
