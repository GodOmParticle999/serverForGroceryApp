import mongoose from "mongoose";


// user Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    role: {
        type: String,
        enum:["Admin","Customer","DeliveryPartner"],
        required: true,
    },
    isActivated:{
           type:Boolean,
           default:false
    }
}, { timestamps: true });

// Customer Schema

const customerSchema = new mongoose.Schema({

  ...userSchema.obj,
   role:{
    type:String,
    enum:["Customer"],
    default:"Customer"
   },
   phone:{
    type:Number,
    required:true,
    unique:true,
    trim:true,
   }, 
   liveLocation:{
    longitude:{
        type:Number,
    },
    latitude:{
        type:Number,
    }
   },
    address:{
        type:String,
    },
    branch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Branch"
    }
   
}, { timestamps: true });


// Delivery Partner Schema

const deliveryPartnerSchema = new mongoose.Schema({
    ...userSchema.obj,
   role:{
    type:String,
    enum:["DeliveryPartner"],
    default:"DeliveryPartner"
   },
   phone:{
    type:Number,
    required:true,
    unique:true,
    trim:true,
   },
   email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
   },
   password:{
    type:String,
    required:true,
    trim:true,
   },
   liveLocation:{
    longitude:{
        type:Number,
    },
    latitude:{
        type:Number,
    }
   },
    address:{
        type:String,
    },
    branch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Branch"
    }
}, { timestamps: true });


// Admin Schema

const adminSchema = new mongoose.Schema({
   ...userSchema.obj,
   role:{
    type:String,
    enum:["Admin"],
    default:"Admin"
   },

   email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
   },
   password:{
    type:String,
    required:true,
    trim:true,
   },
}, { timestamps: true });


export const Customer = mongoose.model("Customer", customerSchema);
export const DeliveryPartner = mongoose.model("DeliveryPartner", deliveryPartnerSchema);    
export const Admin = mongoose.model("Admin", adminSchema);