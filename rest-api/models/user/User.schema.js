const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        require:true,
        min:3,
        max:40,
    },
    email: {
        type:String,
        required:true,
        max:50,
        unique:true,
    },
    password: {
        type:String,
        required:true,
        min:6,
        max:50,
    },
    profilePicture: {
        type:String,
        default:"",
    },
    coverPicture: {
        type:String,
        default:"",
    },
    followers: {
        type:Array,
        default:[],
    },
    following: {
        type:Array,
        default:[],
    },
    isAdmin: {
        type:Boolean,
        default:false,
    },
    desc:{
        type:String,
        max:500,
        default:"",
    },
    city:{
        type:String,
        max:50,
        default:"",
    },
    phone:{
        type:String,
        max: 17,
        default:"",
    },
    company:{
        type:String,
        max: 50,
        default:"",
    },
    position:{
        type:String,
        max: 50,
        default:"",
    },
    github:{
        type:String,
        max: 50,
        default:"",
    },
    skills:{
        type:String,
        max: 150,
        default:"",
    },
    portfolio:{
        type:Array,
        default:[],
    },
    refreshJWT: {
        token: {
            type: String,
            max: 500,
            default:"",
        },
        addedAt: {
            type: Date,
            require: true,
            default:Date.now(),
        },
    },
},
{timestamps:true}
);


module.exports = {
    UserSchema: mongoose.model("User", UserSchema),
};