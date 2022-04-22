const Task = require('../models/task');
const express = require("express")
 const router = express.Router();


 router.post("/add",async(req,res)=>{
     try{
        const tasks = await new Task(req.body).save();
        res.status(200).json(tasks)
     }
     catch(error){
         res.send(error)
     }
 })

 router.get("/",async(req,res)=>{
    try{
       const tasks = await Task.find();
       res.send(tasks)
    }
    catch(error){
        res.send(error)
    }
})


router.put("/:id",async(req,res)=>{
    try{
        const task = await  Task.findOneAndUpdate(
        {_id: req.params.id},
        req.body
        )
        res.send(task)
     }
     catch(err){
         res.send(err)
     }
})

router.delete("/:id",async(req,res)=>{
    try{
        const task = await  Task.findByIdAndDelete(req.params.id);
        res.send(task)
     }
     catch(err){
         res.send(err)
     }
})
 module.exports = router