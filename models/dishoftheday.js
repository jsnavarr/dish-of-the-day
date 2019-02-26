var mongoose = require('mongoose');
 // optional shortcut to the mongoose.Schema class
 var Schema = mongoose.Schema;
 
 var commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        enum: [0, 1, 2, 3, 4, 5]
    }},{
        timestamps: true
      }
 );

 var dishOfTheDaySchema = new Schema ({
    price: {
        type: Number,
        min: 1,
        required: true
    },
    availability_start: {
        type: Date,
        default: new Date(),
        required: true
    },
    availability_end: {
        type: Date,
        default: new Date(),
        required: true
    },
    totalPortions: {
        type: Number,
        min: 1,
        required: true
    },
    comments: {
        type: [commentSchema]
    },
    dish: {
        type: Schema.Types.ObjectId, ref: 'Dish'
    }
 });
 
 module.exports = mongoose.model('DishOfTheDay', dishOfTheDaySchema);