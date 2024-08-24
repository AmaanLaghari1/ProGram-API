import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Register User
export const registerUser = async (req, res) => {
    const {username, password} = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPwd = await bcrypt.hash(password, salt)
    req.body.password = hashedPwd

    const newUser = new UserModel(req.body)

    try {
        const userExist = await UserModel.findOne({username})
        if(userExist){
            res.status(401).json({message: "User already exists!"})
        }else {
            const user = await newUser.save()
            const token = jwt.sign({username: user.username, id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'})
            res.status(200).json({user, token})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Login User
export const loginUser = async (req, res) => {
    const {username, password} = req.body
    
    try {
        const user = await UserModel.findOne({username: username})

        if(user){
            const pwdMatch = await bcrypt.compare(password, user.password)
            
            if(pwdMatch){
                const token = jwt.sign({username: user.username, id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'})
                res.status(200).json({user, token})
            }
            else {
                res.status(400).json({message: "Wrong Password!"})
            }
        }
        else {
            res.status(404).json({message: "User doesn't exists!"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}