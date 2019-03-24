const express = require('express');
const path = require('path');
const app = express();

/*
*******
routes*
*******
*/
const rindex = require('./routes/index');
const rinvest = require('./routes/investor');
const renterpreneur = require('./routes/enterpreneur');
const rbank = require('./routes/bank');
const rhost_competetion = require('./routes/host_competetion');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'static')));

app.use(rindex);
app.use(rinvest);
app.use(renterpreneur);
app.use(rbank);
app.use(rhost_competetion);

app.listen(3000,()=>{
    console.log('API up and running');
})