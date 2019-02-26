var mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost/dish-of-the-day',
     {useNewUrlParser: true}
 );

 var db = mongoose.connection;

 db.on('connected',function(){
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
 })