const express = require("express")
const mongoose = require("mongoose")
const app = express();
const TaskSchema = require("./model.js")
const cors = require("cors")
mongoose.connect("mongodb://localhost:27017/facebook").then(
    ()=>console.log("DB Connected")
)
port = 5000;

app.use(express.json())

app.use(cors({
    origin: "*"
}))

app.post("/addtask", async(req,res)=>{
    const {todo} = req.body
    try{
        const newData =new TaskSchema({
            todo : todo 
        })
       await newData.save(); 
       return res.json(await TaskSchema.find());
    }
    catch(err){
         
    }
})


app.get("/gettask",async (req,res)=>{
try{
return res.json( await TaskSchema.find());

}
catch(err){
    console.log(err)
}
})



app.delete("/delete/:id", async (req,res)=>{
    try{
         await TaskSchema.findByIdAndDelete(req.params.id)
         return res.json(await TaskSchema.find())
    }
    catch(err){
         console.log(err)
    }
})


app.listen(port,()=>{
    console.log("server running at 5000")
})
