import { log } from "console";
import express from "express";
import fs from "fs";
import path from "path";
import { json } from "stream/consumers";

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

//get one todo
app.get("/todos/:id",(req,res)=>{
  const id = req.params.id;
  fs.readFile(filepath,"utf-8",(err,data)=>{
    if(err){
      return res.status(500).send("error")
    }
    const todos =JSON.parse(data);
    const todo =todos.filter((item)=>item.id===id);
    if(!todo){
      return res.status(404).send("not found");
    }
    res.status(200).json(todo)
  })
})


//edit 

app.put("/todos/:id",(req,res)=>{
  const id =req.params.id;

  fs.readFile(filepath,"utf-8",(err,data)=>{
    if(err){
      return res.status(500).send("error")
    }
    const todos =JSON.parse(data);
    const index =todos.findIndex((todo)=>todo.id == id);

    if (index === -1) {
            return res.status(404).send("Todo not found");
        }

    todos[index].title =req.body.title  
    
    fs.writeFile(filepath,JSON.stringify(todos,null,2),(err)=>{
      if (err) {
                return res.status(500).send("Error writing file");
            }
       res.status(200).json(todos[index])     
    })
  })
})


app.listen(3000,()=>{
  console.log("server running");
  
})