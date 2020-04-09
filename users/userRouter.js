const express = require('express');

//set up post database for route handlers
const userDB = require('./userDb.js');
const postDB = require('../posts/postDb.js');

const router = express.Router();

/** CREATE **/
//Posts
router.post('/', validateUser, (req, res) => {
  userDB.insert(req.body)
    .then(user => {
      res
        .status(201)
        .json(user)
    })
    .catch(error => {
      res
      .status(500)
      .json({ message: "There was an error while saving the user to the database", error})
  });
});

//Subroute Posts
router.post('/:id/posts', (req, res) => {
  router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  
    postsDB.insert(req.body)
      .then(post => {
        res
          .status(201)
          .json(post)
      })
      .catch(error => {
        res
        .status(500)
        .json({ message: "There was an error while saving the post to the database", error})
      })
  });
  
/** READ */

router.get('/', (req, res) => {
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

// read for posts subroute
router.get('/:id/posts', validateUserId, (req, res) => {
  const id = req.params.id  

  userDB.getUserPosts(id)
   .then(posts => {
    res
    .status(200)
    .json(posts)
  })
  .catch(error => {
    res
    .status(500)
    .json({ message: "The server could not retrieve the User's posts from the database", error})
  })  
});

/** UPDATE */

router.put('/:id', validateUserId, validateUser, (req, res) => {
  const id = req.params.id
  
  userDB.update(id, req.body)
  .then(userUpdate => {
    userDB.getById(id)
        .then(user => {
          if (userUpdate === 1){ 
            res
              .status(200)
              .json(user)
          } else {
            res
              .status(406)
              .json({ message: "The server returned an incorrect response."})
            }
          })
          .catch(error => {
            res
              .status(500)
              .json({ message: "There was an error while modifying the user in the database", error})
          })
    })
});

/** Delete */

router.delete('/:id', validateUserId, (req, res) => {
  const id = req.params.id

  userDB.getById(id)
    .then(user => {
        userDB.remove(id)
            .then(removedUser => {
               if(removedUser === 1){ 
                res
                .status(200)
                .json({message: `The user with ID number ${id} has been successfully removed.`, user})
               } else {
                 res
                 .status(406)
                 .json({ message: "The server returned an incorrect response."})
               }
            })
            .catch(error => {
                res
                .status(500)
                .json({ message: "The server could not successfully delete the user.", error})
            })
    });
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
