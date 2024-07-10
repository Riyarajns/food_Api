const authMiddleware = require("../middlewares/authMiddleware");
const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');

//GET USET INFGO
const getUserController = async (req, res) => {
    try {
        // find
        const user = await userModel.findById({ _id: req.body.id })
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not Found'
            })
        }
        //hinde password
        user.password = undefined
        //resp
        res.status(200).send({
            success: true,
            message: 'User get Successfully',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Get User API',
            error
        });
    };
    // res.status(200).send("User Data");
    // console.log(req.body.id);  
};
// Update User
// const updateUserController = async (req,res) =>{
//     try{
//       // find user
//       const user = await userModel.findById({_id: req.body.id})
//       //validation
//       if(!user) {
//         return res.status(404).send({
//             success:false,
//             message:'user not found'
//         })
//       }
//       //update
//       const {userName, address,phone} = req.body
//       if(userName) user.userName = userName;
//       if(address) user.address = address;
//       if(phone) user.phone = phone;
//       //save user
//       await user.save();
//       res.status(200).send({
//         success:true,
//         message:"User Updated Successfully",
//       });
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success:false,
//             message:'Error In update User API'
//         })
//     }
// };
//update user
const updateUserController = async (req, res) => {
    try {
        // find user
        const user = await userModel.findById({ _id: req.body.id })
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'user not found'
            })
        }
        //update
        const { userName, address, phone } = req.body
        if (userName) user.userName = userName;
        if (address) user.address = address;
        if (phone) user.phone = phone;
        //save user
        await user.save();
        res.status(200).send({
            success: true,
            message: "User Updated Successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In update User API'
        })
    }
}
//update user password
const updatePasswordController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById({ _id: req.body.id })
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not found"
            })
        }
        // get data from user
        const { oldPassword, newPassword } = req.body
        if (!oldPassword || !newPassword) {
            return res.status(500).send({
                success: false,
                message: "Please Provide old or New password"
            })
        }
        //check user password | compare password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: 'Invalid old password',
            });
        }
        //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword
    await user.save();
    res.status(200).send({
        success: true,
        message: "Password Updated!",
    });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error In Password update API',
            error
        })
    }
};
//RESET Password
const resetPasswordController = async(req,res) => {
    try{
      const  {email, newPassword, answer} = req.body
      if(!email || !newPassword) {
        return res.status(500).send({
            success:false,
            message:'Please Provide All Fields'
        })
      }
      const user = await userModel.findOne({email,answer})
      if(!user) {
        return res.status(500).send({
            success:false,
            message:'User Not Found invlaid answer'
        })
      }
      //hashing password
      var salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword
      await user.save()
      res.status(200).send({
        success:true,
        message:'Password Reset Successfully',
      })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in Password REST API'
        })
    }
};
// Delete Profile Account
const deleteProfileController = async(req,res) => {
    try{
       await userModel.findByIdAndDelete(req.params.id);
       return res.status(200).send({
        success:true,
        message:"Your account has been deleted"
       });
    } catch(error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In delete Profile API'
        })
    }
};


module.exports = { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController }