const resturantModel = require("../models/resturantModel");

//create Reasturant
const createResturantController = async(req,res) => {
    try{
       const {title,imgUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords} = req.body
       //validation
       if(!title || !coords){
        return res.status(500).send({
            success:false,
            message:"please provide title and address",
        });
       }
       const newResturant = new resturantModel({title,imgUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords});
       await newResturant.save()

       res.status(201).send({
        success:true,
        message:"'New Resturant Created Successfully",
       });
    } catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error In Create Resturant api",
        })
    }
};
// Get All Resturant
const getAllResturantController = async(req,res ) => {
    try {
       const resturants = await resturantModel.find({})
       if(!resturants){
        return res.status(404).send({
            success:false,
            message:"No Resturant Availible"
        })
       }
       res.status(200).send({
        success:true,
        totalCount:resturants.length,
        resturants
       })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In Get All Resturant API',
            error
        })
    }
}
//Get All Resturant Id
const getResturantByIdController = async(req, res) => {
    try{
       const resturantId = req.params.id;
       if(!resturantId) {
        return res.status(404).send({
            success:false,
            message:"Please Provide Resturant ID",
        });
       }
       //find resturant
       const resturant = await resturantModel.findById(resturantId);
       if(!resturantId) {
        return res.status(404).send({
            success:false,
            message:'no resturant found'
        });
       }
       res.status(200).send({
        success:true,
        resturant,
       })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Erorr  In Get All Resturant Id Api",
            error
        })
    }
}
//Delete Resturant || Delete
const deleteResturantController = async(req,res) => {
    try {
       let resturantId = req.params.id
       resturantId = resturantId.trim();
       if(!resturantId){
        return res.status(404).send({
            success:false,
            message:"No Resturant found Or provide Resturant ID"
        })
       }
       await resturantModel.findByIdAndDelete(resturantId);
       res.status(200).send({
        success:true,
        message:"Resturant Deleted Successfully",
        
       });
      
    } catch (error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In delete Resturant api',
            error,
        })
    }
}
//update Resturant || update
const updateResturantController = async(req, res) => {
      try {
          
      } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In Update Resturant Api',
            error,
        })
      }
}

module.exports = { createResturantController, getAllResturantController, getResturantByIdController, deleteResturantController, updateResturantController}