import express from "express";

const app = express(); //creates an express app

//helps us to give ability to our server
//parse the json request it gets from the client side 
app.use(express.json());

//routes import
import userRouter from "./routes/user.route.js";

//routes declaration
app.use("/api/v1/users", userRouter);




//example route: http://localhost:4000/api/v1/users/register


export default app;

//export keyword used so we can reuse the variable in another file