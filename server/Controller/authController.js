const Agency = require("../model/AgencyModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Contact = require("../model/contact")
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
        const existingUser = await Agency.findOne({email})
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
        console.log(token,"from token");

        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge:30*24*60*60*1000
        })

        res.status(200).json({message:"Login successfull",agency:existingUser,token})

    } catch (error) {
        
        res.status(500).json({message:"internal error",error})
        console.log("error in Login control",error)
    }
}

const logout = async (req,res)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"unauthorized: no token provided"})

    }

    try {
        res.clearCookie("token")
        res.status(200).json({message:"logout successfull"})
    } catch (error) {
        
    }
}


const agencyFetch = async (req,res)=>{
   
    try {
        console.log(req.user,"from agency fetch request");
        const agency = await Agency.findById(req.user.id).select("-password")
        if(!agency){
            return res.status(404).json({message: "agency not found"})
        }
        res.status(200).json(agency)
    } catch (error) {
        
    }
}

const contactUs = async (req,res)=>{
    try {
        const {name,email,phone,message} = req.body;
        const userId = req.user?.id;
       
        const newMessage = new Contact({
            userId,
            name,
            email,
            phone,
            message,
        });

        await newMessage.save();
        res.status(201).json({success: true, message: "Contact request sent successfully."})
    } catch (error) {
        console.error("Error saving contact request:", error);
        res.status(500).json({ success: false, message: "Failed to send contact request." });
        
    }
}


module.exports = {register,login,agencyFetch,contactUs,logout}