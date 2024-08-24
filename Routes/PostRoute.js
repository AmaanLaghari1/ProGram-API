import express from "express";
import { createPost, deletePost, getPost, likePost, timelinePosts, updatePost } from "../Controllers/PostController.js";

const Router = express.Router()

// Get Post Request
Router.get('/:id', getPost)
// Create Post Request
Router.post('/', createPost)
// Update Post Request
Router.put('/:id', updatePost)
// Delete Post Request
Router.delete('/del/:id', deletePost)
// Like Post Request
Router.put('/:id/like', likePost)
// Timeline Post Request
Router.get('/:id/timeline', timelinePosts)

export default Router