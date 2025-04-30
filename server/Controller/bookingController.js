  const bookings = require("../model/bookingModel")
exports.postBookings = async (req,res)=>{
   const {members,day,night,mobileNumber,status,type,postId,role,date}=req.body
    const userId= req.user.id
    console.log(userId)
   console.log(members,day,night,mobileNumber,status,type,postId," this is datas in backend")
   try{
     const newBooking= new bookings({
        members,
        day,
        night,
        mobileNumber,
        status,
        date,
        type,
        postId
     })
     if(role==="Agency"){
        newBooking.agency= userId
     }else if (role==="User"){
        newBooking.user=userId
     }else{
        return res.status(400).json("invalid role")
     }

     await newBooking.save()
      res.status(200).json({message:"Post successfully booked",newBooking})
   }catch(error){
   console.error(error)
   res.status(500).json({errorMessage:"error occured while book the",error})
   }
}