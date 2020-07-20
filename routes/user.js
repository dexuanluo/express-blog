const express = require('express');
const {SuccessRes, ErrorRes} = require('../model/result')
const {login_authentication} = require('../controller/user');
const { escapeQuote } = require('xss');
const router = express.Router();

/* GET home page. */
router.post('/login', function(req, res, next) {
    const {username, password} = req.body;
        
    const result = login_authentication(username, password);
    return result.then(
        (data)=>{
            if (data.length>0){
                req.session.realname = data[0].realname;
                req.session.username = data[0].username;
               
                res.json( new SuccessRes())
                return
            } else {
                 res.json(new ErrorRes('wrong username or password'))
                 return
            }
        }
    );
});

router.get('/login-test',(req,res,next) =>{
    if (req.session.username){
        res.json(new SuccessRes())
        return
    }else{
        res.json(new ErrorRes())
        return
    }
})




// router.get('/session-test', (req, res, next)=>{
//     const session = req.session;
//     if (session.viewCount == null){
//         session.viewCount = 0;
//     }
//     session.viewCount++;
//     res.json({
//         viewNum: session.viewCount
//     })
// })
module.exports = router;