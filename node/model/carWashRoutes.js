const mongoose = require('mongoose');
const schema = mongoose.Schema;

     // Creating Schema
const expoSchema = new schema ({

    CompanyName:{
        type:String,
        required: [true,'CompanyName is required']
    },
 
    CompanyEmail:{
        type:String,
        required: [true,'Email is required']
    },

    LocationOfCompany:{
        type:String,
        required: [true,'Location is required']
    },

});

const Expo = mongoose.model('Expo',expoSchema); //create a model that is going to represent our collection in the DB.
    module.exports = Expo; //here we are exporting this file so that we can use it in other files.