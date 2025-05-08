const packageModel = require("../model/PackageModel")
const Agency = require("../model/AgencyModel")
const {imageUpload} = require("./arrayImageUpload")

exports.addPackages = async (req,res)=>{
  
   const {companyDescription,destination,destinationCategory,adult,minor,phoneCode,mobileNumber,currency,payment,packageDescription,type} = req.body
    // const AgencyId= req.user.id
  
    console.log(type ,"this is type ")
  //  console.log(req.files)
   console.log(req.user.id)
   const file = req.files
   
   const agencyId= req.user.id
   console.log(agencyId,"this is agency id")
  
     try{

      const agency = await Agency.findById(agencyId);

      console.log(agency.status,"this is agency status")
        if(agency.status!=="Accepted"){
         res.status(401).json({message:"You have no Access to Add Package! Wait Until Admin is Accept Your Request"})
         return
        }

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
      //  console.log(newPackage)
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
    const agencyId =req.user.id
    // console.log(agencyId,"this is agency id from fetch packages")
    const page = parseInt(req.query.page) || 1;  
    const limit = parseInt(req.query.limit) || 4; 
    const {searchQuery,catagory}=req.query
    
    const skip = (page -1) * limit;
    // console.log(searchQuery,catagory,"this is search  and catogory");
    let query={}
      
    if (catagory !== "All") {
      query.destinationCategory = new RegExp(catagory, "i");
    }
    if(agencyId){
    query.agencyId=agencyId
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

   const PackagesWithLikedCount= fetchedAgency.map((pkg)=>{
    const likeCount = pkg.likedBy.filter((like)=> like.status=== true).length;
    // const isLiked= pkg.likedBy.find((like)=>like.user=== id)
   
    return {
      ...pkg.toObject(),
      likeCount
    }
   })
  
    res.status(200).json({
      message: "Agency fetched Successfully",
      fetchedAgency:PackagesWithLikedCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });

    // console.log(query);
    console.log("success");
  } catch (error) {
    console.log("error occurred while fetching", error);
    res.status(500).json({
      error: "An error occurred while agency fetching",
      details: error.message,
    });
  }
};
exports.updateLike = async (req, res) => {
  const userId = req.user.id; 
  console.log(userId,"this is userId")
  const { status,packageId } = req.body;
  console.log(status,"this is status")
  try {
  
    const package = await packageModel.findById(packageId);
    if (!package) {
      return res.status(404).json({ message: "Package not found" });
    }
    const existingLike = package.likedBy.find(
      (like) => like.user.toString() === userId
    );

    if (existingLike) {
       existingLike.status = status;
    } else {
        package.likedBy.push({
        user: userId,
        status: status,
      });
    }
    await package.save();
    console.log(package,"after updating")
    res.status(200).json({
      message: status ? "Liked" : "Unliked",
      likedBy: package.likedBy,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating like status",
      error: error.message,
    });
  }
};

exports.deletePackage = async (req,res)=>{

 const packageId =req.query.id
//  console.log(packageId ,"id for delete")
 try{
   const response = await packageModel.deleteOne({_id:packageId})
   if(response.deletedCount ===0){
    res.status(401).json({message:"Package is not found"})
    return
   }

   res.status(200).json({message:"Package Deleted Successfully", response})
 }catch(error){
  res.status(500).json({errorMessge:"error occured while package deleting",error})
  console.log(error)

 }

}