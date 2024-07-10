const express = require('express');
const { registerController, loginController } = require('../controller/authControllers');

const router = express.Router();

//routes
//Register || POST
router.post('/register', registerController)

// login post
router.post('/login', loginController)
module.exports = router