import express, { urlencoded } from "express";
import mongoose from "mongoose";
import env from "dotenv"
import loginroutes from "./Routes/loginroutes.js";
import postRoutes from "./Routes/postRoutes.js";
import cookieParser from 'cookie-parser';


env.config()
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());


const mongoUrl = process.env.MONGO_URL;
// const connect = async () => {
//     try {
//         await mongoose.connect(mongoUrl);
//         console.log("Connected to MongoDB.");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     } 
// };
// connect(); 


//With self calling function-- called immediate invoke function
(async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
})();

app.use("/", loginroutes); 
app.use("/", postRoutes); 

app.listen(8000, () => {
    console.log("Server started on port 8000");
});





