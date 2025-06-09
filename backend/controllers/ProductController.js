import productModel from "../models/productModel.js";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      shortDescription,
      description,
      category,
      bestseller,
      offer,
      variants,
      uploadedVideos,
      uploadedImages,
      uploadedAnimationImages,
    } = req.body;

    console.log("Received data:", req.body.variants);
    let parsedVariants;
    try {
      parsedVariants = JSON.parse(variants);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid variants format. Must be a JSON array.",
      });
    }

    const uploadedVariants = [];

    for (let variant of parsedVariants) {
      let { gender, color, sizeChart, sizesInfo } = variant;
      let videoUrl = uploadedVideos[`video_${gender}_${color}`] || null;
      let imageUrls = uploadedImages[`images_${gender}_${color}`] || [];
      let animationimageUrls = uploadedAnimationImages[`animations_${gender}_${color}`] || [];

      if (imageUrls.length === 0 || animationimageUrls.length === 0 ) {
        return res.status(400).json({
          success: false,
          message: `Video and images are required for ${gender} ${color} variant`,
        });
      }

      uploadedVariants.push({
        gender,
        color,
        videoUrl,
        images: imageUrls,
        sizeChart,
        sizesInfo,
        animationimages: animationimageUrls,
      });
    }

    const product = new productModel({
      name,
      shortDescription,
      description,
      category,
      bestseller,
      offer,
      variants: uploadedVariants,
    });

    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Remove Product
export const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await productModel.findOneAndDelete({ id });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// List Products
export const listProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Single Product
export const getProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await productModel.findOne({ id });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};