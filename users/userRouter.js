const express = require('express');
const userDB = require('./userDb.js')

const router = express.Router();

router.post('/', (req, res) => {
  
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  userDB.get()
  .then(users => {
     res
     .status(200)
     .json({users})
  })
  .catch(error => {
    res
    .status(500)
    .json({ message: "The user list could not be retrieved from the database", error})
  })
});

router.get('/:id', validateUserId, (req, res) => {
  const id = req.params.id

  userDB.getById(id)
  .then(user => {
    res
    .status(200)
    .json(user)
  })
  .catch(error => {
    res
    .status(500)
    .json({ message: "The server could not retrieve the User from the database", error})
  })
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

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id;
  console.log(id);
  userDB.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res
        .status(400)
        .json({error: 'Invalid user ID.'});
      }
    })
    .catch(error => {
      console.log(error);
      res
      .status(500)
      .json({error: 'Server error validating user ID'});
    })
} 

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
