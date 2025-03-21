const organizedPackage = require("../model/organizedPackage")
const {imageUpload} =require("./arrayImageUpload")
exports.addOrganizedPackage = async(req,res)=>{
    const{ destination,
        startingDestination,
        destinationCategory,
        adult,  
        minor,  
        phoneCode,
        mobileNumber,
        currency,
        payment,
        packageDescription,
        startingDate,
        returningDate,
        type
    } = req.body
        //  console.log("reached organised controller")
        //  console.log(destination,"here the organized destination")
        //  console.log(req.files)
        //  console.log(req.user.id)
         const file= req.files
         const agencyId= req.user.id
         console.log(type)
         




   try{
     const newOrganizedPackage= new organizedPackage({
        destination,
    startingDestination,
    destinationCategory,
    adult,  
    minor,  
    phoneCode,
    mobileNumber,
    currency,
    payment,
    packageDescription,
    startingDate,
    returningDate,
    agencyId
     })
     await newOrganizedPackage.save()
     const id =newOrganizedPackage._id
     
    const imageResponse=  await imageUpload(file,id,type)
              if(imageResponse.status ===200){
                const imageUrl=imageResponse.imageUrl
              }else{
                return res.status(imageResponse.status).json({ message: "Image upload failed" });
              }
           
           
    
            console.log("package save successfully")
            return res.status(200).json({messag:"package created succussfully",newOrganizedPackage})
           
         }catch(error){
           console.error(error,"error while saving the packages")
           return res.status(500).json({error:"error occured while creating package",error})
         }
       
        }

exports.getOrganizedPackages= async(req,res)=>{
      try{
     const response =  await organizedPackage.find()
     res.status(200).json({message:"Organized packages are fetched succussfully",response})
      }catch(error){
     console.error(error)
     res.status(500).json({error:"error occured while fetching organized packages",error})
      }
    }     