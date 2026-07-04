import { User } from "../models/user.model.js";

const RegisterUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are important!" });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "User already exist!" });
        }

        // creating a new user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password
        });

        res.status(201).json({
            message: "User successfully registered!",
            user: { id: user._id, email: user.email, username: user.username }
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!",
            error: error.message
        });
    }
};

//function to login existing user
const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()            
        });
        if(!user) return res.status(400).json({
            message: "User not found, please sign up"
        });

        const isMatch = await user.comparePassword(password);

        if(!isMatch) return res.status(400)   // ✅ Fix 1: was if(isMatch)
            .json({ message: "Invalid Credendtials entered!!" })

        res.status(200).json({
            message: "User logged in Successfully",
            user: {
                id: user._id,                 
                email: user.email,
                username: user.username,               
            }
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


const logoutUser = async(req, res) => {
    try {
        const { email } = req.body;

        const user = user.findOne({
            email
        });

        if(!user) return res.status(404).json({
            message: "User not found !"
        });

        res.status(200).json({
            message: "Logging out successful",
            user: user.email
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error
        });
    }
}

export { RegisterUser,
         loginUser,
         logoutUser,

};

 
