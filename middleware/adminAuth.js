const config = require('config')
const jwt = require('jsonwebtoken')

module.exports = async function(req, res, next) {

    const token = req.header('x-user-token')
    if (!token) return res.status(403).send('ACCESS DENIED')
    try {
        const decode = await jwt.verify(token, config.get('pzPrivateKey'));
        req.user = decode;
        if (req.user.isAdmin) {
            next()
        }

    } catch (error) {
        res.status(401).send(`Unauthorised Access , User has to be Admin`)
    }


}