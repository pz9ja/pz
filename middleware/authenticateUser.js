const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = async function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).send('Access Denied.No token Found');
  }
  try {
    const decode = await jwt.verify(token, config.get('pzPrivateKey'));
    req.user = decode;
    next();
  } catch (error) {
    res.send(400).send('Please Login or Register');
  }
};
