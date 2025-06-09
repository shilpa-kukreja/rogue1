import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
         type:String,
         required:true
    },
    cartData: { 
        type: [
          {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Product ID
            size: { type: String, required: true }, 
            quantity: { type: Number, required: true, min: 1 },
            actualPrice: { type: Number, required: true },
            discountPrice: { type: Number, required: true },
            images: { type: [String], default: [] }
          }
        ],
        default: []
      },
    password:{
        type:String,
        required:true
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});
export default mongoose.model('User',userSchema)