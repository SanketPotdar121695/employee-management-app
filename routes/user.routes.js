const { Router } = require('express');
const { signup, login } = require('../controllers/user.controllers');

const userRouter = Router();

userRouter.post('/login', login);
userRouter.post('/signup', signup);

module.exports = { userRouter };
