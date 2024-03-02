import User from "../models/User.js";
import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const routes = express.Router();

// User registration--------------------------------------------------------------------
routes.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        // console.log(req.body)
        if (!username) {
            throw new Error("Username is required");
        }
        if (!password) {
            throw new Error("Password is required");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });

        const savedUser = await user.save(); //database me save kara rhe
        if (!savedUser) {
            throw new Error("Unable to register");
        }
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 


// User login--------------------------------------------------------------------------
routes.post('/login', async (req, res) => {
    try {
        const { username, password, phoneNumber, email } = req.body;
        if (!password) {
            throw new Error("Password is required");
        }

        let userData = {} 
        if (username) {
            userData.username = username;
        } else if (phoneNumber) {
            userData.phoneNumber = phoneNumber;
        } else if (email) {
            userData.email = email;
        }
        else {
            throw new Error("Username/Email/PhoneNumber them is required");
        }

        const user = await User.findOne(userData);
        if (!user) {
            throw new Error("User does not exists");
        }
        const passwordMatch = bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("Password incorrect");
        }
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { //token generate hoga
            expiresIn: '1h',
        });

        // cookie part added here----- 
        res.cookie('token', 'token.value', { maxAge: 900000, httpOnly: true });
        // console.log(user)

        const jsonUser = user.toJSON() //password hide karna hai
        delete jsonUser.password;
        res.status(200).send({ user: jsonUser });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}); 

export default routes;


