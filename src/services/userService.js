const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('dotenv').config();

const connUri = process.env.MONGO_DEV_CONN_URL;
const User = require('../models/user');

module.exports = {
  register: (req, res) => {
    mongoose.connect(connUri, { useNewUrlParser : true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
      let result = {};
      let status = 201;
      if (!err) {
        const { firstname, lastname, username, password } = req.body;
        const user = new User({ firstname, lastname, username, password});
        user.save((err, user) => {
          if (!err) {
            result.status = status;
            result.result = user;
          } else {
            status = 500;
            result.status = status;
            result.error = err;
          }
          res.status(status).send();
        });
      } else {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
      }
    });
  },

  login: (req, res) => {
    const { username, password } = req.body;

    mongoose.connect(connUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
      let result = {};
      let status = 200;
      if(!err) {
        User.findOne({username}, (err, user) => {
          if (!err && user) {
            // We could compare passwords in our model instead of below as well
            bcrypt.compare(password, user.password).then(match => {
              if (match) {
                status = 200;
                // Create a token
                const payload = { user: user.name };
                const options = { expiresIn: '2d', issuer: 'spinny' };
                const secret = process.env.JWT_SECRET;
                const token = jwt.sign(payload, secret, options);

                result.token = token;
                result.status = status;
                result.result = user;
              } else {
                status = 401;
                result.status = status;
                result.error = `Authentication error`;
              }
              res.status(status).send(result);
            }).catch(err => {
              status = 500;
              result.status = status;
              result.error = err;
              res.status(status).send(result);
            });
          } else {
            status = 404;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
          }
        });
      } else {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
      }
    });
  }
};