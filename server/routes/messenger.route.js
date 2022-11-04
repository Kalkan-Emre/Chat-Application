require('dotenv').config();
const express = require('express');
const app = express();
const messengerRoute = express.Router();
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

// User and Message model
const User = require('../models/User');
const Message = require('../models/Message');
const UserLogs = require('../models/UserLogs');

app.use(express.json())


// Authenticate Token

function authenticateToken(req,res,next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token==null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(403);
    req.user = user 
    next()

  })
}


// Authenticate User
messengerRoute.route('/user/login').post((req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
    }  
    let user_password = user.password;
    bcrypt.compare(password, user_password, function(err, isMatch) {
      if(err) throw err;
      if(isMatch) {

        const user_info = {
          id: user._id,
          name: user.name,
          designation: user.designation,
          username: user.username,
          email: user.email
        }
        const accessToken = jwt.sign(user_info, process.env.ACCESS_TOKEN_SECRET);

        res.json({
          success: true,
          token: 'JWT '+accessToken,
          user: {
            id: user._id,
            name: user.name,
            designation: user.designation,
            username: user.username,
            email: user.email
          }
        })
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Add User
messengerRoute.route('/user').post(authenticateToken, (req, res, next) => {
  User.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});


// Get All Users
messengerRoute.route('/user/list').get(authenticateToken, (req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Delete user
messengerRoute.route('/user/:id').delete(authenticateToken, (req, res, next) => {
  User.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

// Get single user
messengerRoute.route('/user/:id').get(authenticateToken, (req, res) => {
  User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update user
messengerRoute.route('/user/:id').put(authenticateToken, (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})


// Send Message
messengerRoute.route('/user/send-message').post(authenticateToken, (req, res, next) => {
  Message.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get Inbox
messengerRoute.route('/user/:username/inbox').get(authenticateToken, (req, res) => {
  Message.find({to:req.params.username},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});


// Get Outbox
messengerRoute.route('/user/:username/outbox').get(authenticateToken, (req, res) => {
  Message.find({from:req.params.username},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Delete message
messengerRoute.route('/user/message/:id').delete(authenticateToken, (req, res, next) => {
  Message.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

// Create Log
messengerRoute.route('/user-log').post(authenticateToken, (req, res, next) => {
  UserLogs.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get User Logs
messengerRoute.route('/user-log/list').get(authenticateToken, (req, res) => {
  UserLogs.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get User Logs
messengerRoute.route('/user-log/list/:pageNo/:limit').get(/*authenticateToken,*/ (req, res) => {
  UserLogs.paginate(req.params.pageNo, req.params.limit, function(err, response) {
    if (err) {
        return res.status(500).json({
            message : "Error",
            error : err
        });
    }
    return res.status(200).json(response);
});
})

module.exports = messengerRoute;