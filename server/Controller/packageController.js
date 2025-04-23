const packageModel = require("../model/PackageModel")
const Agency = require("../model/AgencyModel")
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

exports.fetchPackages = async (req, res) => {
  try {
 
    const page = parseInt(req.query.page) || 1;  
    const limit = parseInt(req.query.limit) || 4; 
    const {searchQuery,catagory}=req.query
    
    const skip = (page -1) * limit;
    console.log(searchQuery,catagory,"this is search  and catogory");
    let query={}
      
    if (catagory !== "All") {
      query.destinationCategory = new RegExp(catagory, "i");
    }
    
    if(searchQuery){
      const regExp= new RegExp(searchQuery,"i")
      query.$or=[
        { destination:regExp},
        { destinationCategory:regExp},
        { companyName:regExp},
       
      ]
    }
    
    const fetchedAgency = await packageModel
      .find(query) 
      .skip(skip)
      .limit(limit)
      .populate("agencyId");

    const totalCount = await packageModel.countDocuments();
   if(fetchedAgency.length === 0){
    res.status(200).json({message:`No package found for search: "${searchQuery || 'N/A'}" or category: "${catagory || 'N/A'}"`,})
    return
   }
    res.status(200).json({
      message: "Agency fetched Successfully",
      fetchedAgency,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });

    console.log(query);
    console.log("success");
  } catch (error) {
    console.log("error occurred while fetching", error);
    res.status(500).json({
      error: "An error occurred while agency fetching",
      details: error.message,
    });
  }
};
exports.updateLike =  async (req,res)=>{
  try{
     console.log(req.body)
     console.log(req.user.id)
     const {status}= req.body
     console.log(status,"this is liked ")


  }catch(error){
 res.status(500).json({message:"an error occured while add like ",error:error})
  }
}
