import mongoose, { Schema } from "mongoose";
//for password hashing
import bcrypt from "bcrypt";

const userSchema = new Schema({

    username: {
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 1,
        maxLength: 10,     
    },

    password :{
        type: String,
        required: true,
        minLength: 6,
        maxLength: 20
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email"
        ]

    }
},

{
    timestamps: true
}

)

//hashing our password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 10)   
    
});

//To compare passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", userSchema)