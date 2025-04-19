const express=require("express");
const app=express();
const mongoose=require('mongoose');
const note=require('./models/structure');
const path =require('path');
const methodOverride=require('method-override');

app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/sticky_notes");
    console.log("mongo-db connected")
}
main();

app.listen(8080,()=>{
    console.log("server is listening to the port 8080")
})

// show
app.get("/all",async(req,res)=>{
    let notes =await note.find({});
    res.render("show.ejs",{notes});
})


// <form action="all/<%=note._id%>/view">

// <form action="all/<%=note._id%>/edit" method="get">

//</form action="all/<%=note._id%>/delete?_method=DELETE" method="post"> 

//view specific note
app.get("/all/:id/view",async (req,res)=>{
    let {id}=req.params;
    let thisNote=await note.findById(id);
    res.render("view.ejs",{thisNote});
})

// show edit specific note
app.get("/all/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let thisNote=await note.findById(id);
    res.render("edit.ejs",{thisNote});
})
//patch the note
app.patch("/all/:id/editing",async (req,res)=>{
    let {id}=req.params;
    let {heading,text}=req.body;
    let updatedNote=await note.findByIdAndUpdate(id,{
        heading:heading,
        text:text
    });
    
    res.redirect("/all");
})
//delete specific note
app.delete("/all/:id/delete",async (req,res)=>{
    let {id}=req.params;
    await note.findByIdAndDelete(id);
    res.redirect("/all")
})

//add new note
app.get("/all/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/all/new",async (req,res)=>{
    let{heading,text}=req.body;
    let newNote = new note({heading,text});
    await newNote.save();
    res.redirect("/all")
})