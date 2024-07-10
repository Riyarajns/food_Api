const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createCatController, getAllCatController, updateCatController, deleteCatController } = require("../controller/categoryController");
const { route } = require("./testRoutes");

const router = express.Router();

//routes
//Create Cat
router.post('/create', authMiddleware, createCatController);

//Get  All Cat
router.get("/getAll", getAllCatController);

//Update Cat
router.put('/update/:id',authMiddleware, updateCatController);

//Delete Cat
router.delete("/delete/:id", authMiddleware, deleteCatController);

//export
module.exports = router;