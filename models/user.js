var mongoose = require('mongoose');
 // optional shortcut to the mongoose.Schema class
 var Schema = mongoose.Schema;

 var userSchema = new Schema ({
    role: {
        type: String,
        // enum: ['COOKER', 'CONSUMER', 'ADMIN']
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    street: {
        type: String,
        // required: true
    },
    number: {
       type: String,
    //    required: true
    },
    zip: {
        type: Number,
        // required: true
    },
    city: {
       type: String,
    //    required: true
    },
    state: {
        type: String, //should be an enum with all states
        // required: true
    },
    country: {
       type: String,
       default: 'USA'
    },
    googleId: {
        type: String
    },
    avatar: {
        type: String
    }
 }); 

 module.exports = mongoose.model('User', userSchema);