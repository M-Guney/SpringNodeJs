var express = require('express');
const { route } = require('./auditlogs');
var router = express.Router();
const isAuthenticated = true;

router.all("*",(req,res,next) => { 
  if(isAuthenticated){
    next();
  }
  else{
      res.json({sucess:"false", message:"Unauthorized"});
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({succeess: true});
});
//11
module.exports = router;
