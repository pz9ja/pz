const config = require('config');

module.exports = () => {
  const con = config.get('pzPrivateKey');
  if (!con) {
    console.error('FATAL ERROR: Jwt Config Not set');
    process.exit(1);
  }
};
