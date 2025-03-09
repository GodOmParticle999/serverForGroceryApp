import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },  
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
        trim: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
  discountPrice: {
    type: Number,
    
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;