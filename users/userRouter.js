const express = require('express');

//set up post database for route handlers
const userDB = require('./userDb.js');
const postDB = require('../posts/postDb.js');

const router = express.Router();

// CREATE 
router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

/* 
  validateUserID()
  validates user id on every request that expects a user id parameter
  - if the id parameter is valid, store that user object as req.user
  . if the id parameter is invalid, cancel the request and respond with 400 and {message: 'invalid user id'}
*/
function validateUserId(req, res, next) {
  //set id to the requested paramater id
  const id = req.params.id;
  //log the id to verify
  console.log(id);
  //access the id in the userDb
  userDB.getById(id)
  //set user variable
  .then(user => {
    //check if user id is valid
    if(user){
      //set the requested user to the user
      req.user = user;
      next();
    //if not valid user
    } else {
      //send the response back as invalid
      res
        .status(400)
        .json({message: 'invalid user id'});
    }
  })
  //set up catch for server side error 500
  .catch(err => {
    console.log(error);
    res
      .status(500)
      .json({error: 'Server error validating user ID.'});
  })
}

/**
  validateUser()
  validates the body on a request to create a new user
  if the request body is missing, cancel the request and respond with status 400 and {message: 'missing user data'}
  if the request body is missing the required name field, cancel the request and respond with 400 and {message: 'missing required name field'}
 */
function validateUser(req, res, next) {
  //check to see of the request body is missing
  if (Object.keys(req.body).length === 0){
    res
      .status(400)
      .json({message: 'missing user data.'});
  //check to see if the name field is missing
  } else if(!req.body.name){
    res
      .status(400)
      .json({messgae: 'missing required name field'});
  }
  next();
}

/**
- `validatePost` validates the `body` on a request to create a new post
  - if the request `body` is missing, cancel the request and respond with status `400` and `{ message: "missing post data" }`
  - if the request `body` is missing the required `text` field, cancel the request and respond with status `400` and `{ message: "missing required text field" }`
 */
function validatePost(req, res, next) {
  //check to see of the request body is missing
  if(Object.keys(req.body).length === 0) {
    res
      .status(400)
      .json({message: 'missing post data'});
  //check to see if the body text field is missing
  } else if(!res.body.text) {
    res
      .status(400)
      .json({message: 'missing required text field.'})
  }
  next();
}

module.exports = router;
