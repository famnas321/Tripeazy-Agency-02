const packageModel = require("../model/PackageModel")
const {uploadImage} =require("./createController")
exports.addPackages = async (req,res)=>{
  
   const {companyDescription,destination,destinationCategory,adult,minor,phoneCode,mobileNumber,currency,payment,packageDescription} = req.body
   // const AgencyId= req.user._id
  
  //  console.log(req.body)
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
       console.log("just above of the saving")
       console.log(newPackage)
        await newPackage.save()
       if(req.files){
        await uploadImage()
       }
        console.log("after saving")
       
     }catch(error){
       console.error(error,"error while saving the packages")
     }
   
}