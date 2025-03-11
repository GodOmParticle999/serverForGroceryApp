import mongoose from "mongoose";


const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
  address:{
    type:String
  },
 deliveryPartners:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"DeliveryPartner",
    },
 ],
}, { timestamps: true });

const Branch= mongoose.model("Branch", branchSchema);

export default Branch;