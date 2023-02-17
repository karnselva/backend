const mongoose=require("mongoose")
const Schema=mongoose.Schema

const userschema=new Schema(
    {
        name:{
            type:String,
            required: true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true
        },
        pic:{
           type:String,
           required:true,
           default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        admin:{
          type:String,
          required:true,
          default:false
        },
        refreshToken:String
    },{
        timestamps:true
    }
)

const usercollection=mongoose.model("Users",userschema)

module.exports=usercollection