const config = require('config')
const jwt = require('jsonwebtoken')


module.exports = async function(req, res, next) {

    const token = req.header('x-user-token')
    if (!token) {
        res.status(401).send('Access Denied.No token Found')
        return
    }
    try {
        const decode = await jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzEwMjNkNGYzY2VkYTJjZjQzNjljY2MiLCJpc0FkbWluIjp0cnVlLCJyb2xlIjpbeyJmcm9udERlc2siOmZhbHNlfSx7Iml0RGVwdCI6ZmFsc2V9LHsic3VwZXJVc2VyIjp0cnVlfV0sImlhdCI6MTU0NDcwMjQxMH0.-YnhAOH7iXMJIbJPIYCH4GcR9ZV6OhmyFxEbBmUB_Ik', config.get('pzPrivateKey'))
        req.user = decode
        next()

    } catch (error) {
        res.send(400).send('Invalid token')
    }



}