const packageModel = require("../model/PackageModel")

exports.addPackages = async (req,res)=>{
  
   const {companyDescription,destination,destinationCategory,adult,minor,phoneCode,mobileNumber,currency,payment,packageDescription} = req.body
   // const AgencyId= req.user._id
  
   console.log(req.body)
   console.log(req.files)
   console.log(req.user.id)

     try{
       const newPackage = new packageModel({
         companyDescription,
         destination,
         destinationCategory,
         adult,
         minor,
         phoneCode,
         mobileNumber,
         currency,
         payment,
         packageDescription
       })
       await newPackage.save()
      

       
     }catch(error){

     }
   
}