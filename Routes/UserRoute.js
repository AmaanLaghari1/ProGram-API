import express from 'express'
import { deleteUser, followUser, getAllUser, getUser, unfollowUser, updateUser } from '../Controllers/UserController.js'

const Router = express.Router()

// Get All User Request
Router.get('/', getAllUser)
// Get User Request
Router.get('/:id', getUser)
// Update User Request
Router.put('/:id', updateUser)
// Delete User Request
Router.delete('/:id', deleteUser)
// Follow User Request
Router.put('/:id/follow', followUser)
// Follow User Request
Router.put('/:id/unfollow', unfollowUser)

export default Router