// routes/productRoutes.js
import express from "express";
import { upload } from "../middleware/multer.js";
import {uploadVideo  } from "../config/cloudinary.js";
import { addProduct, listProducts, removeProduct } from "../controllers/ProductController.js";
import path from "path"; // Add this import at the top
import productModel from "../models/productModel.js";

const router = express.Router();

// routes/productRoutes.js
// routes/productRoutes.js
router.post("/add", upload.any(), async (req, res) => {
  try {
    // Debug log the raw variants data
    console.log("Raw variants data:", req.body.variants);
    
    if (!req.body.variants) {
      return res.status(400).json({
        success: false,
        message: "Variants data is required",
      });
    }

    let parsedVariants;
    try {
      parsedVariants = JSON.parse(req.body.variants);
      
      // Additional validation for parsed variants
      if (!Array.isArray(parsedVariants)) {
        throw new Error("Variants must be an array");
      }
      
      // Validate each variant has required fields
      const invalidVariants = parsedVariants.filter(v => 
        !v.gender || !v.color || !v.sizeChart || !v.sizesInfo
      );
      
      if (invalidVariants.length > 0) {
        throw new Error("Each variant must have gender, color, sizeChart and sizesInfo");
      }
    } catch (error) {
      console.error("Error parsing variants:", error);
      return res.status(400).json({
        success: false,
        message: "Invalid variants format. Must be a valid JSON array with proper structure.",
        details: error.message
      });
    }

    // Process files
    const uploadedVideos = {};
    const uploadedImages = {};
    const uploadedAnimationImages = {};

    req.files.forEach((file) => {
      const [type, gender, color] = file.fieldname.split('_');
      
      const variantKey = `${gender}_${color}`;
      
      if (type === 'video') {
        uploadedVideos[variantKey] = file.path; // Will be replaced with Cloudinary URL
      } 
      else if (type === 'images') {
        if (!uploadedImages[variantKey]) {
          uploadedImages[variantKey] = [];
        }
        uploadedImages[variantKey].push(`/uploads/images/${path.basename(file.path)}`);
      }
      else if (type === 'animations') {
        if (!uploadedAnimationImages[variantKey]) {
          uploadedAnimationImages[variantKey] = [];
        }
        uploadedAnimationImages[variantKey].push(`/uploads/animations/${path.basename(file.path)}`);
      }
    });

    // Process video uploads to Cloudinary
    await Promise.all(
      Object.entries(uploadedVideos).map(async ([key, filePath]) => {
        try {
          const file = req.files.find(f => f.path === filePath);
          if (file) {
            const videoUrl = await uploadVideoToCloudinary(file);
            uploadedVideos[key] = videoUrl;
          }
        } catch (error) {
          console.error(`Error uploading video for ${key}:`, error);
          uploadedVideos[key] = null;
        }
      })
    );

    // Prepare final variants data
    const finalVariants = parsedVariants.map(variant => {
      const variantKey = `${variant.gender}_${variant.color}`;
      
      return {
        ...variant,
        images: uploadedImages[variantKey] || [],
        animationimages: uploadedAnimationImages[variantKey] || [],
        videoUrl: uploadedVideos[variantKey] || null
      };
    });

    // Validate all variants have required files
    const missingFiles = [];
    finalVariants.forEach(variant => {
      if (!variant.images || variant.images.length === 0) {
        missingFiles.push(`Images are required for ${variant.gender} ${variant.color} variant`);
      }
      if (!variant.animationimages || variant.animationimages.length === 0) {
        missingFiles.push(`Animation images are required for ${variant.gender} ${variant.color} variant`);
      }
    });

    if (missingFiles.length > 0) {
      return res.status(400).json({
        success: false,
        message: missingFiles.join(". "),
      });
    }

    // Create product
    const product = new productModel({
      name: req.body.name,
      shortDescription: req.body.shortDescription,
      description: req.body.description,
      category: req.body.category,
      bestseller: req.body.bestseller === 'true',
      offer: req.body.offer || 0,
      variants: finalVariants
    });

    await product.save();
    
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product
    });
    
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
});

router.get("/list",listProducts)
router.delete("/remove/:id", removeProduct );
export default router;