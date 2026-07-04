import mongoose from "mongoose";

export const ConnectDB = async () => {
   try {
     const connectionInstance = await mongoose.connect(
        `${process.env.MONGODB_URI}`)

          console.log(`\n MongoDb connected successfully !!!
            ${connectionInstance.connection.host}`);
   } catch (error) {
    console.log("MongoDB connection failed", error);
    process.exit(1);
    
   }
    
}

export default ConnectDB;