import mongoose from "mongoose";


const orderIncrementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    increment_value:{
        type:Number,
        default:0
    }
}, { timestamps: true });

const OrderIncrement = mongoose.model("OrderIncrementSchema", orderIncrementSchema);

export default OrderIncrement;