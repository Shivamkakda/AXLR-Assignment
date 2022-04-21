const tasks = require("./routes/tasks")
const cors = require("cors")
const connection = require("./db");
const express = require("express")
const app = express();

connection()
app.use(express.json())
app.use(cors())

app.use("/api/tasks", tasks)

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`listning on port 5000`))