import express from "express";
import { loginUser, registerUser } from "../Controllers/AuthController.js";

const Router = express.Router()

// Signup route
Router.post('/register', registerUser)
// Login route
Router.post('/login', loginUser)

export default Router