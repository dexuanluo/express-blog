const {ErrorRes} = require('../model/result')
const loginCheck = (req, res, next)=>{
    if (!req.session.username){
        res.json(
            new ErrorRes('not login')
        )
    }
    next()
    return
}

module.exports = loginCheck