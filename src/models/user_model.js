import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
 
    address: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum:["Admin","Customer",]
    },
    isActivated:{

    }
}, { timestamps: true });