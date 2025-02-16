const categoryModel = require('../models/categoryModel');

const createCatController = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        //valdn
        if (!title) {
            return res.status(500).send({
                success: false,
                message: "Please provide category title or image",
            })
        }
        const newCategory = new categoryModel({ title, imageUrl });
        await newCategory.save();
        res.status(201).send({
            success: true,
            message: "Category Created",
            newCategory,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error In Create Cat Api',
            error,
        })
    }
};
//Get All Cat
const getAllCatController = async (req, res) => {
    try {
        const categories = await categoryModel.find({})
        if (!categories) {
            return res.status(404).send({
                success: false,
                message: 'No Categories found'
            })
        }
        res.status(200).send({
            success: true,
            totalCat: categories.length,
            categories,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get All Category APi",
            error
        })
    }
}
//Upadte Cate
const updateCatController = async (req, res) => {
    try {
        const { id } = req.params
        const { title, imageUrl } = req.body
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, { title, imageUrl }, { new: true });
        if (!updatedCategory) {
            return res.status(500).send({
                success: false,
                message: 'No Category found'
            })
        }
        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error Update Cat Api',
            error

        })
    }
}
//Delete Cat
const deleteCatController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(500).send({
                success: false,
                message: 'Please provide Category ID'
            })
        }
        const category = await categoryModel.findById(id);
        if (!category) {
            return res.status(500).send({
                success: false,
                message: 'No Category Found with this id'
            })
        }
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Category Deleted Succssfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error In Delete Cat Api',
            error
        })
    }
}
module.exports = { createCatController, getAllCatController, updateCatController, deleteCatController };