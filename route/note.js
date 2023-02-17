
const express=require("express")
const verifyJwt=require("../middleware/verifyJwt")
const router=express.Router()
const {
    specificNote,getAllUserNotes,addNote,editNote,getAllNotes,deleteNote
}=require("../controller/notescontroller")

router.get("/notes", getAllUserNotes)
router.get("/mynotes",verifyJwt, getAllNotes)
router.post("/addnote",verifyJwt,addNote)
router.get("/:id",specificNote)
router.put("/editnote/:id",verifyJwt,editNote)
router.delete("/delete/:id",verifyJwt,deleteNote)






module.exports=router