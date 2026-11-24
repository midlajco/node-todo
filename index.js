import { log } from "console";
import express from "express";
import fs from "fs";
import path from "path";

const app =express() ;

app.use(express.json());

const filepath =path.join(import.meta.dirname,"todos.json")

app.listen(3000,()=>{
  console.log("server running");
  
})