import UserModel from '../Models/UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Get All User
export const getAllUser = async (req, res) => {
    try {
        let users = await UserModel.find()
        
        if(users){
            users = users.map(user => {
                // exclude user password
                const {password, ...rest} = user._doc
                return rest
            })
            
            res.status(200).json(users)
        }
        else {
            res.status(404).json({message: "No data found!"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Get User
export const getUser = async (req, res) => {
    const id = req.params.id

    try {
        const user = await UserModel.findById(id)
        
        if(user){
            // exclude user password
            const {password, ...rest} = user._doc
            
            res.status(200).json(rest)
        }
        else {
            res.status(404).json({message: "No such user exists!"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Update User
export const updateUser = async (req, res) => {
    const id = req.params.id
    const {currentUserId, currentUserAdminStatus, password} = req.body
    try {
        if(id == currentUserId || currentUserAdminStatus){
            
            if(password){
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(password, salt)
            }
            
            const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true})

            // Generate new token and update
            const token = jwt.sign({
                id: user._id, username: user.username
            }, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})
            
            res.status(200).json({user, token})
        }
        else {
            res.status(403).json({message: "Access denied! only admin can update"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Delete User
export const deleteUser = async (req, res) => {
    const id = req.params.id
    const {currentUserId, currentUserAdminStatus} = req.body
    
    try {
        if(id === currentUserId || currentUserAdminStatus){
            
            await UserModel.findByIdAndDelete(id)
            
            res.status(200).json({message: "User deleted successfully..."})
        }
        else {
            res.status(403).json({message: "Access denied! only admin can delete"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Follow User
export const followUser = async (req, res) => {
    const id = req.params.id
    const {_id} = req.body
    
    if(_id === id){
        res.status(403).json({message: "Action forbidden!"})
    }
    else {
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(_id)

            if(!followUser.followers.includes(_id)){
                await followUser.updateOne({$push: {followers: _id}})
                await followingUser.updateOne({$push: {following: id}})

                res.status(200).json({message: "User followed..."})
            }
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}

// Unollow User
export const unfollowUser = async (req, res) => {
    const id = req.params.id
    const {_id} = req.body
    
    if(_id === id){
        res.status(403).json({message: "Action forbidden!"})
    }
    else {
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(_id)

            if(followUser.followers.includes(_id)){
                await followUser.updateOne({$pull: {followers: _id}})
                await followingUser.updateOne({$pull: {following: id}})

                res.status(200).json({message: "User unfollowed..."})
            }
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}