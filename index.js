const {connectWithDb}=require('./config/db.config')
const express=require('express');
const app=express();
const cors=require('cors');
app.use(express.json());
app.use(cors("*"));

connectWithDb();

//Import ALL the Router
const userRouter = require("./routes/userRoutes")

app.use("/api/v1/user",userRouter);


app.get("/",(req,res)=>{
    return res.status(200).json({
        status:true,
        message:"Working"
    })
})

app.listen(process.env.PORT || 8081,()=>{
    console.log(`App is running on port 8081`);
})

