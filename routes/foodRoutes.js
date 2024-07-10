const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createFoodController, getAllFoodsController, getSingleFoodController, getFoodByResturantController, updateFoodController, deleteFoodController, placeOrderController } = require("../controller/foodController");


const router  = express.Router();



//routes
//Create food
router.post('/create', authMiddleware, createFoodController);

// Get All Food
router.get("/getAll", getAllFoodsController);

// Get All Food
router.get("/get/:id", getSingleFoodController);

//Get All  rest
router.get("/getByResturant/:id", getFoodByResturantController);

//Update Food
router.put("/update/:id", authMiddleware, updateFoodController);

//Delete Food
router.delete("/delete/:id", authMiddleware, deleteFoodController);

//Order Place Create
router.post("/placeorder", authMiddleware, placeOrderController)


module.exports = router;