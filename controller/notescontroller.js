const notescollection=require("../model/notesschema")
//const usercollection = require("../model/userschema")






const getAllUserNotes=async(req,res)=>{
   
    try{
        const allNotes= await notescollection.find().populate("user")
        console.log(allNotes)
        res.status(200).json({allNotes})
    }
    catch(err){
          return res.status(500).json({error:"server error"})
       
    }
    
}
  
const getAllNotes= async(req,res)=>{
    try{
        userId=req.user._id
        const userNotes=await notescollection.find({user:userId}).populate("user")
        res.status(200).json({data:userNotes})
    }
    catch(err){
        return res.status(500).json({error:"server error"})
       
    }
    


}

const addNote=async (req,res)=>{
     const{title,content,category}=req.body
     
     console.log(req.user) 
     if(!title || !content || !category){
       return res.status(401).json({error:"Need All Details Include Title,Content,Category"})
   
        
     } 
     try{
        console.log("add 1",req.user)
       
        const note= await notescollection.create(
            {
                title,
                content,
                category,
                user:req.user._id,
            }
         )
         console.log("add 3")
         console.log(note,"created notes")
         return res.status(201).json({message:"Notes Successfully Created"})

     }
     catch(err){
        return res.status(500).json({error:"server error"})
        

     }
     
}








const editNote=async (req,res)=>{
    console.log("1")
    const{title,content,category}=req.body
    console.log("2")
    const reqNoteId=req.params.id
    const userId=req.user._id
    if(!title || !content || !category){
       return res.status(401).json({error:"Need All Details Include Title,Content,Category"})
   
     
    } 
    console.log("3")
    const note=await notescollection.findById(reqNoteId)
    console.log("4")
    if (note.user.toString()!== userId.toString()){
        return res.status(401).json({error:"You can't perform this action"})

    } 
    console.log("5")
    try{
        note.title=title
        note.category=category
        note.content=content
        console.log("before")
        await note.save()
        console.log("after")
        res.status(201).json(note)
    }
    catch(err){
        return res.status(500).json({error:"server error"})
    
    }
   
}

const deleteNote= async(req,res)=>{
   const deletableID=req.params.id
   const userId=req.user._id.toString()
   const deletableNote=await notescollection.findById(deletableID)
   console.log("1",deletableNote.user,userId)
   if (deletableNote.user.toString()!== userId.toString()){
    return res.status(401).json({error:"You can't perform this action"})
   
   } 
   try{
    console.log("3")
    await deletableNote.remove()
    console.log("4")
    res.json({ message: "Note Removed" });
   }
   catch(err){
    return res.status(404).json({error:"not able to remove"})
  
   }

}

const specificNote=async(req,res)=>{
    const noteId=req.params.id
    if (!noteId) return new Error("not received any note id")
    try{
        const edittableNote=await notescollection.findById(noteId)
        res.status(200).json({edittableNote})
    }
    catch(err){
         return res.status(404).json({error:"note not found"})
  
    }

    
}



module.exports={
    specificNote, getAllUserNotes,addNote,editNote,getAllNotes,deleteNote
}