const mongoose =require("mongoose")

const PackageMOdel = new mongoose.Schema({
    companyDescription:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    destinationCategory:{
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
        type:String,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    payment:{
        type:String,
        required:true
    },
    packageDescription:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Agency"
    }
})