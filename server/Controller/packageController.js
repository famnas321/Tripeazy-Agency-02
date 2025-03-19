const packageModel = require("../model/PackageModel")
const {imageUpload} = require("./arrayImageUpload")

exports.addPackages = async (req,res)=>{
  
   const {companyDescription,destination,destinationCategory,adult,minor,phoneCode,mobileNumber,currency,payment,packageDescription,type} = req.body
   // const AgencyId= req.user._id
  
    console.log(type ,"this is type ")
  //  console.log(req.files)
   console.log(req.user.id)
   const file = req.files
   
   const agencyId= req.user.id
 
     
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
         packageDescription,
         agencyId

       })
       console.log("just above of the saving")
       console.log(newPackage)
       await newPackage.save()
       const userId= newPackage._id
       if(req.files){
        
        const imageResponse=  await imageUpload(file,userId,type)
          if(imageResponse.status ===200){
            const imageUrl=imageResponse.imageUrl
          }else{
            return res.status(imageResponse.status).json({ message: "Image upload failed" });
          }
       
       }

        console.log("package save successfully")
        return res.status(200).json({messag:"package created succussfully",package:newPackage})
       
     }catch(error){
       console.error(error,"error while saving the packages")
       return res.status(500).json({error:"error occured while creating package",error})
     }
   
}

exports.fetchPackages =  async (req,res)=>{
     try{
       const fetchedAgency = await packageModel.find()
       res.status(200).json({message:"Agency fetched Successfully" ,fetchedAgency})
     }catch(error){
     console.log("error occured while fetching",error)
     res.status(500).json({error:" an error occured while agency feching",error})
     }
}