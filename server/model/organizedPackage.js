const mongoose = require("mongoose")

const organazedSchema = new mongoose.Schema({
    destination:{
        type:String,
        required:true
    },
    startingDestination:{
        type:String,
        required:true
    },
    adult:{
        type:Number,
        required:true
    },
    minor:{
        type:Number,
        required:true
    },
    phoneCode:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    payment:{
        type:Number,
        required:true
    },
    packageDescription:{
        type:String,
        required:true
    },
    startingDate:{
        type:String,
        required:true
    },
    returningDate:{
        type:String,
        required:true
    },
    agencyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Agency"
    },
    images:[
        {
            type:String
        }
    ]
})
module.exports= mongoose.model("organizedPackage",organazedSchema)







