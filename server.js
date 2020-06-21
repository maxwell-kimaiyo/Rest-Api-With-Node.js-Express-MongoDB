
const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017/API";
mongoose.connect(uri,{useUnifiedTopology: true, useNewUrlParser: true,useCreateIndex: true },(error)=>{
    if(!error){
        console.log("MongoDB database connection established successfully");
    }else{
        console.log("Error connecting")
    }
})


const postRouter = require('./routes/post');

app.use('/posts', postRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
