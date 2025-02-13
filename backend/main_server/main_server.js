const express = require("express");
const app = express();
const {} = require("./database");
const cors = require("cors");
const morgan = require('morgan');

app.use(cors({
    origin:true,
    credentials:true
}))

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req,res)=>{
    res.json({message:"hello user"});
})


app.listen(process.env.MAINPORT, ()=>{
    console.log(`Main Server is connected on http://localhost:${process.env.MAINPORT}`)
})