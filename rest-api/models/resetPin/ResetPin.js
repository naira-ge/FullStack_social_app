const mongoose = require('mongoose');

const ResetPinSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        max:50,
    },
    pin: {
        type:String,
        min:6,
        max:6,
    },
},
{timestamps:true}
);


module.exports = {
    ResetPinSchema: mongoose.model("Reset_pin", ResetPinSchema),
};