const express = require("express");
const app = express();
const {} = require("./database");
const cors = require("cors");
const morgan = require('morgan');
const authRoutes = require("./routes/authRoutes")

app.use(cors({
    origin:true,
    credentials:true
}))

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req,res)=>{
    res.json({message:"hello user"});
})

app.use('/auth', authRoutes);


app.listen(process.env.PORT, ()=>{
    console.log(`Server is connected on http://localhost:${process.env.PORT}`)
})