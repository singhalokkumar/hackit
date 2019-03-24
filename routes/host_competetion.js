const express = require('express');
const path = require('path');
const router = express.Router();

/*
host-competetion get
*/
router.get('/host-competetion',(req,res)=>{
    res.render('pages/host_competetion/index');
});




/*
form get
*/
router.get('/form/host-competetion',(req, res)=>{
   res.render('pages/host_competetion/form/index');

});

module.exports = router;