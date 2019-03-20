const _ = require('lodash');
const { Users, loginValidate } = require('../models/user');
const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  const { error } = loginValidate(req.body);
  if (error) return res.status(401).send(error.details[0].message);
  console.log(req.body.username);

  const user = await Users.findOne({ username: req.body.username });
  const email = await Users.findOne({ email: req.body.email });
  if (!(user || email)) {
    return res.status(404).send('User dont exist, check username or email');
  }

  const validpassword = await bcrypt.compare(req.body.password, user.password);
  if (!validpassword) {
    res.status(400).send('Password Incorrect');
    return;
  }

  const token = user.generateAuthToken();
  console.log(token);
  const decode = await jwt.verify(token, config.get('pzPrivateKey'));
  req.user = decode;
  res
    .header('x-user-token', token)
    .send(
      `Welcome ${
        req.user.username
      } ,you are succesfully logged in please check your email to verify your account`
    );
});

router.post('/logout', (req, res) => {
  res.header('x-user-token', '').send(`You are successfully logged out`);
});

module.exports = router;
