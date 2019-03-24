const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/',(req, res)=>{
    /*
    Root get method
    */
   res.render('pages/index');



});

module.exports = router;