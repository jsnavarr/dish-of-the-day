var mongoose = require('mongoose');
 // optional shortcut to the mongoose.Schema class
 var Schema = mongoose.Schema;
 
 var orderSchema = new Schema({
    user_id: {
        type: String,
    },
    dish_id: {
        type: Schema.Types.ObjectId, ref: 'Dish'
    },
    quantity: {
        type: Number,
        // required: true,
        min: 1
    },    
    pickup_time: {
        type: Date,
        // required: true
    },    
    allergies: {
        type: String,
    },
    status: {
        type: String,
        enum: ['ORDERED', 'CANCELLED','DELIVERED']
    }},{
        timestamps: true
      }
 );
 
 module.exports = mongoose.model('Order', orderSchema);