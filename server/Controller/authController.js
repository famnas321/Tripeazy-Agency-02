const AgencySchema = require("../model/AgencyModel")
const bcrypt = require("bcryptjs")


const register = async (req,res)=>{
   console.log("this is register page")
    const {companyName,
        email,
        password,
        confirmPassword,
        contactNumber,
        managerName,
        registrationId,
        country,
        state,
        district} = req.body
    console.log(req.body,"body")
    

    try {
        // if(password != confirmPassword){
        //    return  res.status(400).json("password  do not match")
        // }
        
        const existingUser= await AgencySchema.findOne({email})
        if(existingUser){
           return  res.status(400).json("User already existed")
        }
        
       const salt = await bcrypt.genSalt(10)
       const hashedPassword= await bcrypt.hash(password,salt)
       const newAgency= new AgencySchema({
        companyName,
        email,
        password:hashedPassword,
        
        contactNumber,
        managerName,
        registrationId,
        country,
        state,
        district
    
           
       })
       await newAgency.save()
       console.log(newAgency,"data");
       
        res.status(201).json("user registered successfully")

        } catch (error) {
        res.status(500).json({message:"internal error ",error})
        
    }
}

module.exports = register