const express = require("express");
const connectMongoDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();

const app = express();

PORT = process.env.PORT

connectMongoDB();

app.use(express.json());


app.listen(PORT || 5000, ()=>{
    console.log(`Server started on port ${PORT}`);
})



app.use("/api/auth", require("./routes/userRoutes"));