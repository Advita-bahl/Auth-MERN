const express= require("express");
const app= express();
const mongoose = require("mongoose");
const dotenv= require("dotenv");
const path = require("path");
dotenv.config();

const cors= require("cors");

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;


const userRoute =require("./routes/userRoute.js");

const _filename = __filename;
const _dirname= path.dirname(_filename);
console.log(_dirname);

app.use(express.static(path.join(_dirname, '/frontend/dist')));



mongoose.connect(process.env.URI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("connected successfully");
    app.listen(port , (err)=>{
        if(err) console.log(err);

        console.log("running successfully at", port);
    });
}).catch((error)=>{
    console.log("error", error);
});

app.use(userRoute);
