const express= require("express");
const app= express();
const mongoose = require("mongoose");
const dotenv= require("dotenv");
dotenv.config();

const cors= require("cors");

app.use(cors());

const PORT = process.env.PORT || 3000;


const userRoute =require("./routes/userRoute.js");

app.use(express.json());

mongoose.connect(process.env.URI)
.then(()=>{
    console.log("connected successfully");
    app.listen(PORT , (err)=>{
        if(err) console.log(err);

        console.log("running successfully at", process.env.PORT);
    });
}).catch((error)=>{
    console.log("error", error);
});

app.use(userRoute);
