const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { updateUserController } = require("./userController");

//Register
const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, address,answer } = req.body
        //validation
        if (!userName || !email || !password || !address || !phone ||!answer) {
            return res.status(500).send({
                success: false,
                message:'Please Provide All fields',
            })
        }

        //check user
        const exisiting = await userModel.findOne({ email });
        if (exisiting) {
            return res.status(500).send({
                success: false,
                Message: "Email Already Registerd please Login",
            });
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        //create new user
        const user = await userModel.create({
            userName,
            email,
            password: hashedPassword,
            address,
            phone,
            answer,
        })
        res.status(201).send({
            success: true,
            Message: 'Successfully Registerd',
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            Message: 'Error In Register API',
            error,
        })
    }
};

//login
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //validtation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please Proivide Email or Password",
            });
        }
        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found",
            });
        }
        //check user password | compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(500).send({
                success: false,
                message:"Invalid Credentials",
            });
        }
        //token
        const token = jwt.sign({id:user._id},process.env.jwt_SECRET,{
            expiresIn:"9d",
        })
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            token,
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Login API',
            error
        })
    }
};

module.exports = { registerController, loginController}; 