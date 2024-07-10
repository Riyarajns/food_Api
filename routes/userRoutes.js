const express = require("express");
const { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController} = require("../controller/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const { route } = require("./authRoutes");

const router = express.Router();


//routes
//GET USER || GET
router.get('/getUser', authMiddleware, getUserController)

// Update profile
router.put('/updateUser', authMiddleware, updateUserController)
//password update
router.post('/updatePassword', authMiddleware, updatePasswordController)
// RESET Password
router.post('/resetPassword', authMiddleware, resetPasswordController)
// Delete user
router.delete('/deleteUser/:id', authMiddleware, deleteProfileController)
module.exports = router;