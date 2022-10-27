import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { readdirSync } from "fs";

const morgan = require('morgan');
require("dotenv").config();

const app = express();


//db
//mongodb+srv://kartikey2991:ramu2991@blog-post.yy27wxz.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(process.env.DATABASE)
.then(()=> console.log("DB connected"))
.catch((err) => console.log("DB Connection error =>" ,err));


//middlewares

app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: ["http://localhost:3000"],
}));

//auto load routes

readdirSync('./routes').map((r) => app.use('/api',require(`./routes/${r}`)));

const port = process.env.PORT || 8000;
app.listen(port, ()=> console.log(`Server running on port ${port}`));
