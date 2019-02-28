var mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {reconnectInterval: 500,  useNewUrlParser: true});

 var db = mongoose.connection;

 db.on('connected',function(){
    console.log(`Mongoose connected to: ${process.env.DATABASE_URL}`);
 })