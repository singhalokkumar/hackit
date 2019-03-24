const express = require('express');
const path = require('path');
const router = express.Router();
const bodyparser=require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const urlencodedparser=bodyparser.urlencoded({extended: false});

router.get('/get-funded',(req, res)=>{
    /*
    dependency --> Get funded and register
    */
   res.render('pages/get_funded/index');

});

router.get('/form/get-funded',(req,res)=>{
    res.render('pages/get_funded/form/index');
});


/*
register get
*/
router.get('/register/enterpreneur/:id',(req,res)=>{
    let id = req.params.id;
    /*
    To render 3 pages of the enterpreneurs register
    */
    if(id === "1" || id==="2" || id==="3" ) {
        let page_path = `page_${id}`;
        res.render(`pages/register/enterpreneur/${page_path}/index`);
    }
    if(id==="complete") {
        res.render('pages/register/enterpreneur/complete/index');
    }


    
});

/*
Login get
*/
router.get('/login/enterpreneur',(req,res)=>{
    res.render('pages/login/enterpreneur/index');
});

/*
Register post
*/
// r=require('randomstring');
const url = "mongodb://sih_db:sih_db@routing-database-shard-00-00-mp01p.mongodb.net:27017,routing-database-shard-00-01-mp01p.mongodb.net:27017,routing-database-shard-00-02-mp01p.mongodb.net:27017/test?ssl=true&replicaSet=Routing-database-shard-0&authSource=admin&retryWrites=true"
// router.get('/',function(req,res){
//   MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//     if (err) throw err;
//     console.log('connected with database successfully');
//     var dbo = db.db("sih_db");
//   db.close();
//   res.render('index');
// });
// });
// router.post('/entrepreneur01',urlencodedparser,function(req,res){
//   res.render('page_1');
// });
router.post('/register/enterpreneur/1',urlencodedparser,function(req,res){
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("sih_db");
  dbo.collection('entrepreneurs').insertMany([{first_name:req.body.f_name},{last_name:req.body.l_name},{email:req.body.email},{password:req.body.password},{confirm_password:req.body.c_password},{contact:req.body.contact},{State:req.body.select2}]);
  db.close();
//   res.render('page_2',{data1:req.body});
    res.redirect('/register/enterpreneur/2');
});
});

router.post('/register/enterpreneur/2',urlencodedparser,function(req,res){
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("sih_db");

//   console.log(req.body);
  dbo.collection('entrepreneurs').insertMany([{Company:req.body.company},{Description:req.body.description},{Founder_Name:req.body.founder},{Foundation_Name:req.body.foundation},{Founded_bootstraped:req.body.founded},{Sector:req.body.sector},{Location:req.body.location},{Total_Fund:req.body.total},{Stackholder:req.body.stackholders},{Source:req.body.select3}]);
    db.close();
    if (req.body.select3 === "Others")
    {
    //   res.render('page_3',{data2:req.body});
        res.redirect('/register/enterpreneur/3');
    }
  else
  {
    //   res.render('registered',{data3:req.body});
        res.redirect('/register/enterpreneur/complete');
  }
});
});

router.post('/register/enterpreneur/3',urlencodedparser,(req,res)=>{
    MongoClient.connect(url, {useNewUrlParser: true},(err,db)=>{
        if(err) throw err;
        var dbo = db.db("sih_db");
        dbo.collection('entrepreneurs').insertMany([{Funding:req.body.funding},{Serial:req.body.serial},{Contact:req.body.contact},{Mobile:req.body.mobile},{Website:req.body.website},{Email:req.body.email},{Location:req.body.location},{Total_Fund:req.body.total},{Stackholder:req.body.stackholders},{Source:req.body.select3}]);
        dbo.close();
        res.redirect('/register/enterpreneur/complete');
    })
})
module.exports = router;