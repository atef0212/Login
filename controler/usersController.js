import collection from "../modals/usersSchema.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';



const logIn= async(req, res)=>{
    res.render("login.ejs")
}

const signUp= async (req, res)=>{
    res.render("signup.ejs")
}

const addUsers = async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    };
    try {
        const existingUser = await collection.findOne({ name: data.name });
        if (existingUser) {
            return res.send("User already exists. Please choose a different username.");
        } else {
            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(data.password, saltRounds);
            data.password = hashPassword;

            const newUser = await collection.create(data);

            const payload = {
                userId: newUser._id,
                username: newUser.name
            };
            const secretKey = 'your-secret-key';
            const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
            res.json({ token });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};



const loginUser = async (req, res) => {
    try {
        const user = await collection.findOne({ name: req.body.username });
        if (!user) {
            return res.send("Username not found");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            return res.send("Incorrect password");
        }

        // User authenticated, generate JWT token
        const payload = {
            userId: user._id,
            username: user.name
        };
        const secretKey = 'your-secret-key'; // Replace with your actual secret key
        const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

        // Send the token as a response
        res.json({ token, username: user.name });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
export {loginUser, addUsers, signUp, logIn}