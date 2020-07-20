const express = require('express');
const loginCheck = require('../middleware/loginCheck')
const idCheck = require('../middleware/idCheck')
const router = express.Router();
const {
  getList, 
  getDetail, 
  newBlog,
  updateBlog,
  deleteBlog} = require('../controller/blog');
const xss = require('xss');
const {SuccessRes, ErrorRes} = require('../model/result');

/* GET home page. */
router.get('/list', function(req, res, next) {
  const author = req.query.author || '';
  const keyword = xss(req.query.keyword) || '';
  return getList(author, keyword).then((listData => {
    console.log(req.session)
    res.json(
      new SuccessRes(listData)
      )
}));
  
});

router.get('/detail', idCheck,(req, res, next) => {
 
    const result = getDetail(req.query.id);
    return result.then((detailData) =>{
      if (detailData){
        res.json(
          new SuccessRes(detailData[0])
      );}})
  });
router.post('/new', loginCheck, (req, res, next) =>{
  req.body.auhtor = req.session.username;
  const result = newBlog(req.body);
  return result.then((data)=>{
      res.json( new SuccessRes({
          id:data.insertId
      }))
  })

})

router.post('/update',loginCheck, idCheck,(req, res, next) =>{
  
  const result = updateBlog(req.query.id, req.body);
      return result.then(
          (data)=>{
              if (data.affectedRows > 0){
                  res.json( new SuccessRes())
                  return
              }else{
                  res.json( new ErrorRes('Failed update'))
                  return
              }
          }
      );
}
)
router.post('/del', loginCheck, idCheck, (req, res, next)=>{
      const author = req.session.username;
      const result = deleteBlog(req.query.id, author);
      return result.then(
          (data)=>{
              if (data.affectedRows > 0){
                  res.json( new SuccessRes())
                  return
              }else{
                  res.json(new ErrorRes('Failed delete'))
                  return
              }
          }
      );
})
module.exports = router;