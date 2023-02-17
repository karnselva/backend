const mongoose=require("mongoose")
const Schema=mongoose.Schema

const notesschema=new Schema(
    {
        title:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Users"
        }
    },{
        timestamps:true,
    }
)

const notescollection=mongoose.model("Notes",notesschema)

module.exports=notescollection