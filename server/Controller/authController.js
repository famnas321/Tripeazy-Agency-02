const Agency = require("../model/AgencyModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const register = async (req,res)=>{

    const {companyName,email,password,confirmPassword,contactNO,nameOfManager,registrationId,countryname,stateName,cityName} = req.body
     console.log(req.body)

    try {
        // if(password != confirmPassword){
        //    return  res.status(400).json("password  do not match")
        // }
        // console.log("register function enterd into try block")
        const existingUser= await Agency.findOne({email})
        if(existingUser){
           return  res.status(400).json("User already existed")
        }
        
       const salt = await bcrypt.genSalt(10)
       const hashedPassword= await bcrypt.hash(password,salt)
       const newAgency= new Agency({
            companyName,
            email,
            password:hashedPassword,
            contactNO,
            nameOfManager,
            registrationId,
            countryname,
            stateName,
            cityName,
            status:"Requested"
       })
       await newAgency.save()
       console.log(newAgency,"data");
       
        res.status(201).json({message:"user registered successfully wait for admin approvel"})

        } catch (error) {
        res.status(500).json({message:"internal error ",error})
        console.log(error)
        
    }
}

const login = async (req,res)=>{
    const {email,password} = req.body;
    console.log(req.body,"from login");
    try {
        const existingUser = await AgencySchema.findOne({email})
        if(!existingUser){
            return res.status(404).json("user not found")
        }

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)
        if(!isPasswordCorrect){
            return res.status(400).json("wrong password")
        }

        const token = jwt.sign({
            id:existingUser._id, email:existingUser.email
        },process.env.JWT_SECRET,{expiresIn:"30d"})
        console.log(token,"from token")

        res.status(200).json({message:"Login successfull",agency:existingUser,token})

    } catch (error) {
        
        res.status(500).json({message:"internal error",error})
        console.log("error in Login control",error)
    }
}

module.exports = {register,login}