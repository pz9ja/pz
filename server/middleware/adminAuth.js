const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = async function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(403).send('ACCESS DENIED');
  try {
    const decode = await jwt.verify(token, config.get('pzPrivateKey'));
    req.user = decode;
    if (!req.user.isAdmin) {
      throw new Error('Unauthorised Access , User has to be Admin');
    }

    next();
  } catch (error) {
    // catch that error and send a response to the user
    res.status(401).send(error.message);
  }
};
