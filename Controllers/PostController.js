import PostModel from "../Models/PostModel.js";
import UserModel from "../Models/UserModel.js";
import mongoose from "mongoose";

// Create Post
export const createPost = async (req, res) => {
    const newPost = new PostModel(req.body)

    try {
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Get Post
export const getPost = async (req, res) => {
    const id = req.params.id

    try {
        const post = await PostModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Update Post
export const updatePost = async (req, res) => {
    const id = req.params.id
    const {userId} = req.body

    try {
        const post = await PostModel.findById(id)
        if(userId === post.userId){
            await post.updateOne({$set: req.body})
            res.status(200).json({message: "Post updated..."})
        }
        else {
            res.status(403).json({message: "Action Forbidden!"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Delete Post
export const deletePost = async (req, res) => {
    const id = req.params.id

    try {
        const post = await PostModel.findById(id)
            await post.deleteOne()
            res.status(200).json({message: "Post deleted..."})
        }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Like Post
export const likePost = async (req, res) => {
    const id = req.params.id
    const {userId} = req.body

    try {
        const post = await PostModel.findById(id)
        if(!post.likes.includes(userId)){
            await post.updateOne({$push: {likes: userId}})
            res.status(200).json({message: "Post Liked..."})
        }
        else {
            await post.updateOne({$pull: {likes: userId}})
            res.status(200).json({message: "Post Unliked..."})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Timeline Posts
export const timelinePosts = async (req, res) => {
    const userId = req.params.id

    try {
        const currentUserPosts = await PostModel.find({userId: userId})
        const followingPosts = await UserModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                },
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts"
                },
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0
                }
            }
        ])
        res.status(200).json(
            currentUserPosts.concat(...followingPosts[0].followingPosts)
            .sort((a, b) => b.createdAt - a.createdAt
            )
        )
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}