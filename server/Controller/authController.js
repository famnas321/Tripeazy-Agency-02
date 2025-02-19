const AgencySchema = require("../model/AgencyModel")
const bcrypt = require("bcryptjs")
const register = async (req,res)=>{

    const {companyName,email,password,confirmPassword,contactNumber,managerName,registrationId,country,state,district} = req.body
    console.log(req.body)

    try {
        if(password != confirmPassword){
           return  res.status(400).send("password  do not match")
        }
        const existingUser= await AgencySchema.findOne({email})
        if(existingUser){
           return  res.status(400).send("User already existed")
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
       console.log(newAgency);
       
        res.status(201).send("user registered successfully")

        } catch (error) {
        res.status(500).send({message:"internal error ",error})
        
    }
}

module.exports = register