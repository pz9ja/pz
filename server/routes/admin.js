const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { loginValidate, User } = require('../models/user');

// login the admin
router.post('/login', async (req, res) => {
  // validate the username/email and password
  const { error } = loginValidate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  // find the user by credential
  const userCredential = _.pick(req.body, ['username', 'password']);

  try {
    const user = await User.findByCredentials(userCredential);
    // check if the user is an admin or not
    if (!user.isAdmin) {
      return res.status(401).send({
        error: 'you are not user an authorized user'
      });
    }
    // generate an authentication token for the admin
    res
      .header('x-auth-token', user.generateAuthToken())
      .send(_.pick(user, ['_id', 'email']));
  } catch (error) {
    res.status(400).send({ error: error.message });
    // log the error
  }
});

module.exports = router;
