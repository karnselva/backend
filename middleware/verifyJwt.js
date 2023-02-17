const jwt=require("jsonwebtoken")
const usercollection=require("../model/userschema")

const verifyJwt= async(req,res,next)=>{
     const auth=req.headers.authorization || req.headers.Authorization
     console.log("verfiy jwt 1")
     if (! auth?.startsWith("Bearer")) return res.status(401).json({message:"no access token"})
     console.log("verfiy jwt 2")
     const accessToken=auth.split(" ")[1]
     console.log("verfiy jwt 3",accessToken)
     try{
      const decoded=jwt.verify(accessToken,process.env.ACCESS_TOKEN)
      console.log("verfiy jwt 4")
      req.user= await usercollection.findOne({email:decoded.email})
      console.log("verfiy jwt 5")
      next()
     }
     catch(err){
      res.status(401)
      new Error("jwt not verfiy")
     }
     
        
        
        
        
       
     
  
}

module.exports=verifyJwt