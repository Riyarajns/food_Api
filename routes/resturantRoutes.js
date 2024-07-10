const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createResturantController, getAllResturantController, getResturantByIdController, deleteResturantController, updateResturantController } = require("../controller/resturantController");

const router = express.Router();

//routes
//CREATE RESTURANT || POST
router.post('/create', authMiddleware, createResturantController);

//Get All Resturant 
router.get("/getAll", getAllResturantController);

//Get All Resturant id
router.get("/get/:id", getResturantByIdController);

//Delete Resturant || Delete
router.delete("/delete/:id", authMiddleware, deleteResturantController);

//Update Resturant || update
router.put("/update/:id", authMiddleware, updateResturantController)


module.exports = router;