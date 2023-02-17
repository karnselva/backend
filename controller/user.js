
const bcrypt= require("bcrypt")
const usercollection=require("../model/userschema")
const jwt=require("jsonwebtoken")



const registerUser= async(req,res) =>{
    //console.log(req.body)
    const{name,email,password,pic}=req.body
    if( !email || !password || !name){
      return res.status(401).json({error:"enter valid email and password"})
      
    } 
    const existuser=await usercollection.findOne({email}).exec()
    
    if (existuser){
      return res.status(409).json({error:"user already exists"})
     
    } 
    try{
        console.log("1")
      const hashedpassword= await bcrypt.hash(password,10)
      console.log("2")
      const result=await usercollection.create({name,email,password:hashedpassword,pic})
     
      console.log(result)
      return res.status(201).json({message:"successfuly created"})
    }
    catch(err){
      return res.status(500).json({error:"not successfull creation"})
           
    }
     

}


const loginUser=async(req,res) =>{
    //console.log(req.body)
    const{email,password}=req.body
    if( !email || !password){
      return res.status(401).json({error:"enter valid email and password"})
    
    } 
    const existuser = await usercollection.findOne({email}).exec()
    if (!existuser){
      return res.status(401).json({error:"User not found,create new user account"})
    
    } 
 
        console.log("1")
      const ismatch= await bcrypt.compare(password,existuser.password)
      if (ismatch){
        const accessToken=jwt.sign({email:existuser.email},process.env.ACCESS_TOKEN,{expiresIn:"1d"})
        const refreshToken=jwt.sign({email:existuser.email},process.env.REFRESH_TOKEN,{expiresIn:"1d"})
        existuser.refreshToken=refreshToken
        await existuser.save()
        const user={
          name:existuser.name,
          id:existuser._id,
          admin:existuser.admin,
          pic:existuser.pic
        }
        res.cookie("jwt",refreshToken,{secure:true,httpOnly:true,sameSite:'None',maxAge:24*60*60*1000})
        return res.status(200).json({userInfo:{user,accessToken},message:"successfully logined"})
      }
      else{
        return res.status(401).json({error:"password not match"})
      }
      

    
     

}

const logout=async(req,res) =>{
  const cookie=req.cookie
  const refreshToken=cookie?.jwt
  const matchuser= await usercollection.findOne({refreshToken}).exec()
  matchuser.refreshToken=""
  await matchuser.save()
  res.clearCookie("jwt",{ httpOnly: true, sameSite: 'None', secure: true })
  res.status(204).json({message:"successfully logout"})
  

}





module.exports={registerUser,loginUser,logout}