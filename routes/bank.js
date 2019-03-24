const express = require('express');
const path = require('path');
const router = express.Router();

// Bank Login
router.get('/login/bank',(req, res)=>{
   res.render('pages/login/bank');

});

module.exports = router;