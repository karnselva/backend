const jwt=require("jsonwebtoken")
const usercollection=require("../model/userschema")

const refreshToken=(req,res,next)=>{
    const cookie=req.cookie
    if(!cookie.jwttoken) return res.status(401).json({message:"cookie not found"})
    const refreshToken=cookie.jwt
    const matchuser=usercollection.findOne({refreshToken}).exec()
    if (!match) return res.status(403).json({message:"cookie is not match"})
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN,(err,payload)=>{
        if (err || matchuser.name!=payload.name){
            return res.status(403).json({message:"cookie is not match"})
        }
        const accessToken=jwt.sign({name:matchuser.name},process.env.ACCESS_TOKEN,{expiresIn:"60s"})
        res.status(201).json({accessToken})
    })
    
   

}

module.exports=refreshToken