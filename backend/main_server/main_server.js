const express = require("express");
const app = express();
const {} = require("./database");
const cors = require("cors");
const morgan = require('morgan');
const userRoutes = require("./main_routes/userRoutes");
const projectRoutes = require("./main_routes/projectRoutes");
const taskRoutes = require("./main_routes/taskRoutes");

app.use(cors({
    origin:true,
    credentials:true
}))

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req,res)=>{
    res.json({message:"hello user"});
})

app.use("/users", userRoutes)
app.use("/projects", projectRoutes)
app.use("/tasks", taskRoutes)

app.listen(process.env.MAINPORT, ()=>{
    console.log(`Main Server is connected on http://localhost:${process.env.MAINPORT}`)
})