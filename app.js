const express = require('express');
const app = express();
const userRoute = require('./src/routes/api');
const User=require("./src/models/user")
const dotenv = require('dotenv');
const bodyParser=require('body-parser')
// Load environment variables from .env file
dotenv.config();
//for port is define from env

const PORT = process.env.PORT || 5000;

//for mongo db connection
const connectDb=require('./src/db/connect');

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//default api url 
app.get("/", (req, res) => {
    res.send("Hey this is first node js api");
});

//for get the all route here for use in app.js for start nodejs 
app.use('/api', userRoute);


const start = async () => {
    try {
        await connectDb();
        console.log("first connect mongo db");
        app.listen(PORT, () => {
            console.log(`second ${PORT} port is connected successfully`);
        })
    } catch (error) {
        console.log(error)
    }
}

start();