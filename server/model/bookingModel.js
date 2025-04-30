const mongoose = require("mongoose")

const bookingModel = new mongoose.Schema(
    {
        postId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"packageModel",
            required:true

        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:false

        },
        agency:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Agency",
            required:false

        },
        members:{
            type:Number,
            required:true

        },
        day:{
            type:Number,
            required:true

        },
        night:{
            type:Number,
            required:true

        },
        mobileNumber:{
            type:String,
            required:true

        },
        status:{
            type:String,
            required:true,
            default:"Pending"
        },
        type:{
            type:String,
            required:true,
          
        },
        date: {
            type: Date,
            required: true,
          }
          


    }
)
module.exports= mongoose.model("bookings",bookingModel)