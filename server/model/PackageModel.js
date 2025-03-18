const mongoose = require("mongoose")

const PakageSchema = new mongoose.Schema({
    companyDescription :{
        type:String,
    
    },
    destination :{
        type:String,
        required:true

    },
    destinationCategory :{
        type:String,
        required:true

    },
    adult :{
        type:Number,
        required:true

    },
    minor :{
        type:Number,
        required:true

    },
    phoneCode :{
        type:Number,
        required:true

    },
    mobileNumber :{
        type:Number,
        required:true

    },
    currency :{
        type:String,
        required:true

    },
    payment :{
        type:Number,
        required:true

    },
    packageDescription :{
        type:String,
        required:true

    },
    agency:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Agency"
    },
    ratings:{
      type:Number
    }
    
})