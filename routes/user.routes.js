const express = require('express');
const {
    userSignUp,
    updateDetails,
    loginInUser
} = require('../controller/user.controller');
const {protectRoute} = require('../utils/auth-helper')
const userRouter = express.Router();

userRouter
    .post('/sign-up', userSignUp)
    .post('/update-user/:id',updateDetails)
    .get('/login', loginInUser)

module.exports = {
    userRouter
}