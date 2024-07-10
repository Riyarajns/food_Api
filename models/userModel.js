const mongoose = require('mongoose');

//schema
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true, 'user name is required']
    },
    email:{
        type:String,
        required:[true, 'email is required'],
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        required:[true, 'phone is required']
    },
    usertype:{
        type:String,
        required:[true, 'user type is required'],
        default:'clinet',
        enum:['clinet', 'admin','vendor','driver']
    },
    profile:{
        type:String, 
        default:'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'
    },
    answer:{
        type:String,
        required:[true, "Answer is required"],
    }
},{timestamps:true})

//export
module.exports = mongoose.model('User',userSchema)