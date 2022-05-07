//index.js is the conventional default name
const express = require('express');
const app     = express();

app.get('/', function(req, res){
    res.send('Hello Little Server');
});

app.listen(3000, function(){
    console.log("running on port 3000");
});