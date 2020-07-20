const idCheck = (req, res, next)=>{
    if (!req.query.id){
        res.json( 
            new ErrorRes('no id specified')
        )
        return
    }
    next()
}
module.exports = idCheck