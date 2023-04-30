const express = require('express');
const port = 300;
const app = express();
const routes = require('./routes/index');
const URL = require('./config/mongoose')
//middleware
app.use(express.urlencoded());
app.use('/',routes);

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('Server Is Running And Up On Port',port);
})
