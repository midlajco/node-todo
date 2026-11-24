import { log } from "console";
import express from "express";
import fs from "fs";
import path from "path";

const app =express() ;

app.use(express.json());

const filepath =path.join(import.meta.dirname,"todos.json")


//get all todos
app.get("/todos",(req,res) =>{
  fs.readFile(filepath,"utf-8",(err,data)=>{
    if(err){
      return res.status(500).send("error tp read")
    }
    const todos =JSON.parse(data)
    console.log(todos);
    res.status(200).json(todos)
  })})

//post


app.post("/todos",(req,res)=>{


  const newTodo ={
    id:Date.now(),
    title:req.body.title,
    completed:false
  };

   fs.readFile(filepath,"utf-8",(err,data)=>{
    if(err){
      return res.status(500).send("read erro");
    }
    
    const todos =JSON.parse(data) ;
    todos.push(newTodo);
    
    fs.writeFile(filepath,JSON.stringify(todos,null,2),(err)=>{
        if(err){
          return res.status(500).send("error writng")
        }
        res.status(201).json(newTodo)
    })

   })

})




app.listen(3000,()=>{
  console.log("server running");
  
})