const mongoose = require('mongoose');
const URL = "mongodb+srv://sdmohapatra7:1234@quotation.dpwue8z.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(URL)
.then(()=>console.log('MongoDb Is Up And Connected '))
.catch((error)=>console.log('error connected in Db',error));