const express = require('express');
const path = require('path');
const router = express.Router();

const bodyparser=require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const urlencodedparser=bodyparser.urlencoded({extended: false});

const url = "mongodb://sih_db:sih_db@routing-database-shard-00-00-mp01p.mongodb.net:27017,routing-database-shard-00-01-mp01p.mongodb.net:27017,routing-database-shard-00-02-mp01p.mongodb.net:27017/test?ssl=true&replicaSet=Routing-database-shard-0&authSource=admin&retryWrites=true"
//front-page
router.get('/investor',(req, res)=>{
   res.render('pages/investor/index');

});

/*      REGISTERING */

//get
router.get('/register/investor',(req,res)=>{
        res.render('pages/register/investor');
});

router.get('/register/investor/complete',(req,res)=>{
        res.send('Your requests has been submitted');
})
//post

router.post('/register/investor',urlencodedparser,function(req,res){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("sih_db");
    //dbo.collection('investor').insertMany({first_name:req.body.f_name},{last_name:req.body.l_name},{email:req.body.email},{password:req.body.password},{confirm_password:req.body.c_password},{contact:req.body.contact},{State:req.body.select2});
    console.log(req.body);
    db.close();
    res.redirect('/register/investor/complete');
  });
  });
  




//log in get
router.get('/login/investor',(req,res)=>{
        res.render('pages/login/investor/index');
});

module.exports = router;