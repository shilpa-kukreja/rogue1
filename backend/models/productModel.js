import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  gender: { type: String, enum: ["men", "women"], required: true },
  color: { type: String, required: true },
  videoUrl: { type: String, default : 'Video Not Found'}, // Video for rotating product
  images: [{ type: String, required: true }],
  animationimages:[{ type: String, required: true }], // Additional images
  sizeChart: [
    {
      ref: { type: String, required: true },
      label: { type: String, required: true },
      XXS: { type: Number, required: true },
      XS: { type: Number, required: true },
      S: { type: Number, required: true },
      M: { type: Number, required: true },
      L: { type: Number, required: true },
      XL: { type: Number, required: true },
      XXL: { type: Number, required: true },
    },
  ],
  sizesInfo: [
    {
      size: { type: String, required: true },
      actualPrice: { type: Number, required: true },
      discountPrice: { type: Number, required: true },
      offer: { type: Number, required: true },
    },
  ],
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  bestseller: { type: Boolean, default: false },
  offer: { type: Number, required: true },
  variants: [variantSchema], // Array of variants (men & women with different colors)
  date: { type: Date, default: Date.now },
});

const productModel = mongoose.model("Product", productSchema);
export default productModel;