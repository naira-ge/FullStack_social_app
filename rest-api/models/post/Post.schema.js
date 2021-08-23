const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    userId: {
        type:Schema.Types.ObjectId,
        required:true,
    },
    title:{
        type:String,
        max: 100,
        default: '',
        required:true,
    },
    desc:{
        type:String,
        max: 700,
        default: '',
        required:true,
    },
    status: {
        type:String,
        max: 30,
        require:true,
        default:'Pending',
    },
    img:{
        type: String,
        default:'',
    },
    like:{
        type:Array,
        default:[],
    },
    conversations: [
        {
        sender: {
            type:String,
            max: 50,
            default: '',
            required:true,
            },
        message: {
            type:String,
            max: 300,
            default: '',
            required:true,
            },
        msgAt: {
            type: Date,
            default: Date.now(),
            required:true,
            },
        }
    ]
},
{timestamps:true}
);

module.exports = {
    PostSchema: mongoose.model("Post", PostSchema)
};