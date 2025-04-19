const mongoose= require('mongoose');

const noteSchema =new mongoose.Schema({
    heading:String,
    text:String,
    created_at: Date

})

module.exports=mongoose.model("Note",noteSchema);