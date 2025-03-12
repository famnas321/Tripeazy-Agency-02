const jwt = require("jsonwebtoken")

const authMiddleware = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"unauthorized: no token provided"})
    }
    
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded;
        
        next()
        
    } catch (error) {
        return res.status(403).json({message:"invalid token"})
    }
}

module.exports = authMiddleware