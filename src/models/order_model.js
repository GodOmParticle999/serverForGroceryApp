import mongoose from "mongoose";
import OrderIncrement from "./orderIncrement_model";


const orderSchema=new mongoose.Schema({
    orderId:{
        type:String,
        required:true,
        unique:true
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer",
        required:true
    },
    orderDate:{
        type:Date,
        default:Date.now
    },
    deliveryPartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"DeliveryPartner"
    },
    branch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Branch",
        required:true
    },
    items:[
        {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        },
        item:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        },
        count:{type:Number,required:true,default:1}
    },
],
    orderStatus:{
        type:String,
        enum:["available","confirmed","arriving","delivered","cancelled"],
        default:"available"
    },
    deliveryLocation:{
        latitude:{ type:Number,required:true},
        longitude:{type:Number,required:true},
        address:{type:String},
    },
    pickupLocation:{
        latitude:{ type:Number,required:true},
        longitude:{type:Number,required:true},
        address:{type:String},
    },
    deliveryPersonLocation:{
        latitude:{ type:Number,required:true},
        longitude:{type:Number,required:true},
        address:{type:String},
    },
    totalAmount:{
        type:Number,
        required:true
    },
    paymentMethod:{
        type:String,
       enum:["COD","PAID"],
       default:"COD"
    },
}, { timestamps: true });


async function getNextOrderIncrementId(orderNameForId){
    const orderIncrement=await OrderIncrement.findOneAndUpdate({name:orderNameForId},{$inc:{increment_value:1}},{new:true,upsert:true});
    return orderIncrement.increment_value
     
}

// generate next OrderId

orderSchema.pre("save",async function(next){
    if(this.New){
        const incrementValue=await getNextOrderIncrementId("orderId")
        this.orderId=`ORDR${incrementValue.toString().padStart(5,"0")}`
    }
    next()
})

const Order=mongoose.model("Order",orderSchema)
export default Order