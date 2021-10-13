var express = require('express');
const { addArticle, addContact, updatecontact } = require('../database');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/pa',async function(req,res,next){
  try{
    const {articlename,articletext,pdate,author_id}=req.body;
    const data  = await addArticle(articlename,articletext,pdate,author_id);
    res.send(data);
}catch(error){
    console.log(error);
    res.send(error);
}
});

router.post('/contact',async function(req,res,next){
  try{
    const {fname,lname,email,mobileno,message,gender}=req.body;
    console.log(req.body);
    const data1 = await addContact(fname,lname,email,mobileno,message,gender);
    res.send(data1);
  }catch(error)
  {
    res.send(error);
  }
});

router.post('/edit',async function(req,res,next){
  try{
    const{fname,lname,email,mobileno,message,gender,id}=req.body;
    const data = await updatecontact(fname,lname,email,mobileno,message,gender,id);
    res.send(data);
  }catch(error)
  {
    console.log(error);
  }
});
module.exports = router;
