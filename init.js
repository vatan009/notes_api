const mongoose=require('mongoose');
const note=require('./models/structure')

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/sticky_notes');
}

main().then(()=>{
    console.log("init : mongo connected")
})
.catch(()=>{
    console.log("inti : some error in mongodb connection")
})

let allnotes=[
    {
        heading:"time table",
        text:" lets see about it tonight",
        created_at:new Date(),
    },
    {
        heading:"todays aim",
        text:"to complete this project",
        created_at:new Date(),
    }
]

note.insertMany(allnotes);