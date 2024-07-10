const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");
const mongoose = require("mongoose");

//Create food
const createFoodController = async (req, res) => {
    try {
        const { title, description, price, imageUrl, foodTags, category, code, isAvailabe, resturant, rating } = req.body;
        if (!title || !description || !price || !resturant) {
            return res.status(500).send({
                success: false,
                message: 'Please Provide all fields',
            })
        }
        const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailabe,
            resturant,
            rating,
        });
        await newFood.save()
        res.status(201).send({
            success: true,
            message: "New Food Item Created",
            newFood,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error In Create food Api',
            error,
        })
    }
}

// Get All Food
const getAllFoodsController = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        if (!foods) {
            return res.status(404).send({
                success: false,
                message: ' No food item was found',
            });
        }
        res.status(200).send({
            success: true,
            totalFoods: foods.length,
            foods,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error In GetAll Food Api',
            error,
        })
    }
}
//Get Single Food
const getSingleFoodController = async (req, res) => {
    try {
        const foodId = req.params.id
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: 'Please provide id'
            })
        }
        const food = await foodModel.findOne();
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No Food found with this id"
            });
        }
        res.status(200).send({
            success: true,
            food,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error In Get single Food Api',
            error,
        })
    }
}
//Get all rest Id
const getFoodByResturantController = async (req, res) => {
    try {
        const resturantId = req.params.id
        if (!resturantId) {
            return res.status(404).send({
                success: false,
                message: 'Please provide id'
            })
        }
        const food = await foodModel.find({ resturant: resturantId });
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No Food found with this id"
            });
        }
        res.status(200).send({
            success: true,
            message: "Food base on resturant",
            food,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error In Get Resturant Food Api',
            error,
        })
    }
}
//update food 
const updateFoodController = async (req, res) => {
    try {
        const foodId = req.params.id.trim();
        if (!foodId) {
            return res.status(404)({
                success: false,
                message: 'No found id was found'
            })
        }
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: 'No Found food'
            })
        }
        const { title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailabe,
            resturant,
            rating, } = req.body;
        const updatedFood = await foodModel.findByIdAndUpdate(foodId, {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailabe,
            resturant,
            rating,
        }, { new: true })
        res.status(200).send({
            success: true,
            message: "Food Item was Updated"

        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error In Update Food Api',
            error,
        })
    }
}
//Delete food
const deleteFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: 'Provide food id'
            })
        }
        const food = await foodModel.findOne()
        if (!food) {
            return res.status(404).send({
                success: false,
                message: 'Provide food Found with id'
            })
        }
        await foodModel.deleteOne();
        res.status(200).send({
            success: true,
            message: "Food Item Delete"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error In Delete Food Api',
            error,
        })
    }
}
// Place Order 
// const placeOrderController = async(req,res) => {
//     try{
//        const  {cart} = req.body;
//        if(!cart){
//         return res.status(500).send ({
//             success:false,
//             message:'plase food cart or payment method'
//         })
//        }
//        //const foodObjectIds = foods.map(food => mongoose.Types.ObjectId(food.id));
//        let total = 0;
//        //cal
//        cart.map((i) =>{
//          total += i.price
//        })
//        const newOrder = new orderModel({
//         foods:cart,
//         payment:total,
//         buyer:req.body.id
//        })
//     await newOrder.save();
//        res.status(201).send({
//         success:true,
//         message:"Order Placed Successfully",
//         newOrder,
//        })
//     }catch(error){
//         console.log(error);
//         res.status(500).send({
//             success:false,
//             message:'Error In Place Order In Api',
//             error,
//         })
//     }
// }

const placeOrderController = async (req, res) => {
    try {
        const { cart, id } = req.body;

        if (!cart) {
            return res.status(500).send({
                success: false,
                message: 'Please provide a food cart or payment method'
            });
        }

        // Convert food ids to ObjectId
        const foodObjectIds = cart.map(food => mongoose.Types.ObjectId(food.id));

        let total = 0;
        // Calculate total
        cart.forEach(item => {
            total += item.price;
        });

        const newOrder = new orderModel({
            foods: foodObjectIds,
            payment: total,
            buyer: mongoose.Types.ObjectId(id)
        });

        await newOrder.save();
        res.status(201).send({
            success: true,
            message: "Order Placed Successfully",
            newOrder
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error In Place Order In API',
            error
        });
    }
};






module.exports = { createFoodController, getAllFoodsController, getSingleFoodController, getFoodByResturantController, updateFoodController, deleteFoodController, placeOrderController }