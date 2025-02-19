const AgencySchema = require("../model/AgencyModel")

const register = async (req,res)=>{
    const {companyName,email,password,confirmPassword,contactNumber,managerName,registrationId,country,state,district} = req.body
    console.log(req.body)
    try {
        res.send("user registered successfully")
        
    } catch (error) {
        
    }
}

module.exports = register