const tasks = require("./routes/tasks")
const express = require("express")
const dotenv = require("dotenv");
const mongoose =require("mongoose");
const cors = require("cors")
const app = express();
app.use(cors())


dotenv.config();

app.use(express.json());
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(console.log("connection succesfull")).catch((err)=>{
    console.log((err))
});

app.use("/api/tasks", tasks)

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`listning on port 5000`))


