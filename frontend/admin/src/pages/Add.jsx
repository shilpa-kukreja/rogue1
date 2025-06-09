import React, { useEffect, useRef, useState } from "react";
import { addProduct } from "../api";
import { FaSpinner } from "react-icons/fa";

const Add = () => {
  // Product Form State
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "hello",
    description: "",
    category: "test category",
    bestseller: false,
    offer: 0,
  });

  const [loading, setLoading] = useState(false);

  const descriptionEditorRef = useRef(null);
  const shortDescriptionEditorRef = useRef(null);

  useEffect(() => {
    // Initialize editors after component mounts
    if (window.CKEDITOR) {
      descriptionEditorRef.current = window.CKEDITOR.replace('description-editor', {
        toolbar: [
          { name: 'document', items: ['Source'] },
          { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike'] },
          { name: 'paragraph', items: ['NumberedList', 'BulletedList', 'Blockquote'] },
          { name: 'links', items: ['Link', 'Unlink'] },
          { name: 'insert', items: ['Image', 'Table'] },
          { name: 'styles', items: ['Styles', 'Format'] },
          { name: 'tools', items: ['Maximize'] }
        ],
        height: 200
      });

      shortDescriptionEditorRef.current = window.CKEDITOR.replace('short-description-editor', {
        toolbar: [
          { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline'] },
          { name: 'paragraph', items: ['NumberedList', 'BulletedList'] },
          { name: 'links', items: ['Link', 'Unlink'] }
        ],
        height: 150
      });

      // Set change handlers
      descriptionEditorRef.current.on('change', () => {
        setFormData(prev => ({
          ...prev,
          description: descriptionEditorRef.current.getData()
        }));
      });

      shortDescriptionEditorRef.current.on('change', () => {
        setFormData(prev => ({
          ...prev,
          shortDescription: shortDescriptionEditorRef.current.getData()
        }));
      });
    }

    return () => {
      // Clean up editors when component unmounts
      if (descriptionEditorRef.current) {
        descriptionEditorRef.current.destroy();
      }
      if (shortDescriptionEditorRef.current) {
        shortDescriptionEditorRef.current.destroy();
      }
    };
  }, []);

  // Initial Variant Structure with dummy video
  const initialVariant = {
    gender: "men",
    color: "",
    video: "dummy-video-placeholder", // Add dummy video placeholder
    videoPreview: null,
    animationimages: [],
    animationPreviews: [],
    images: [],
    imagePreviews: [],
    sizeChart: [
      { ref: "", label: "", XXS: 0, XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
    ],
    sizesInfo: [],
  };

  // Variants State
  const [variants, setVariants] = useState([{ ...initialVariant }]);

  /** Handle Input Change for Product Details */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /** Handle Input Change for Variants */
  const handleVariantChange = (index, field, value) => {
    setVariants((prev) => {
      const updatedVariants = [...prev];
      updatedVariants[index][field] = value;
      return updatedVariants;
    });
  };

  /** Add New Size Chart to Variant */
  const addSizeChart = (variantIndex) => {
    setVariants((prev) => {
      const updatedVariants = [...prev];
      updatedVariants[variantIndex].sizeChart.push({
        ref: "",
        label: "",
        XXS: 0,
        XS: 0,
        S: 0,
        M: 0,
        L: 0,
        XL: 0,
        XXL: 0,
      });
      return updatedVariants;
    });
  };

  /** Remove Size Chart from Variant */
  const removeSizeChart = (variantIndex, sizeChartIndex) => {
    setVariants((prev) => {
      const updatedVariants = [...prev];
      updatedVariants[variantIndex].sizeChart.splice(sizeChartIndex, 1);

      const allSizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
      const availableSizes = new Set();

      updatedVariants[variantIndex].sizeChart.forEach(chart => {
        allSizes.forEach(size => {
          if (chart[size] > 0) {
            availableSizes.add(size);
          }
        });
      });

      updatedVariants[variantIndex].sizesInfo = Array.from(availableSizes).map(size => {
        const existingInfo = updatedVariants[variantIndex].sizesInfo.find(
          info => info.size === size
        ) || { size, actualPrice: 0, discountPrice: 0, offer: 0 };
        return existingInfo;
      });

      return updatedVariants;
    });
  };

  /** Handle Size Chart Change */
  const handleSizeChartChange = (variantIndex, sizeChartIndex, field, value) => {
    setVariants((prev) => {
      const updatedVariants = [...prev];
      updatedVariants[variantIndex].sizeChart[sizeChartIndex][field] = value;

      const allSizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
      const availableSizes = new Set();

      updatedVariants[variantIndex].sizeChart.forEach(chart => {
        allSizes.forEach(size => {
          if (chart[size] > 0) {
            availableSizes.add(size);
          }
        });
      });

      updatedVariants[variantIndex].sizesInfo = Array.from(availableSizes).map(size => {
        const existingInfo = updatedVariants[variantIndex].sizesInfo.find(
          info => info.size === size
        ) || { size, actualPrice: 0, discountPrice: 0, offer: 0 };
        return existingInfo;
      });

      return updatedVariants;
    });
  };

  /** Handle Size Info Change */
  const handleSizesInfoChange = (variantIndex, sizeIndex, field, value) => {
    setVariants((prev) => {
      const updatedVariants = [...prev];
      updatedVariants[variantIndex].sizesInfo[sizeIndex][field] = value;

      if (field === 'actualPrice' || field === 'discountPrice') {
        const { actualPrice, discountPrice } = updatedVariants[variantIndex].sizesInfo[sizeIndex];
        if (actualPrice > 0 && discountPrice > 0) {
          const offer = Math.round(((actualPrice - discountPrice) / actualPrice) * 100);
          updatedVariants[variantIndex].sizesInfo[sizeIndex].offer = offer;
        }
      }

      return updatedVariants;
    });
  };

  const handleVideoUpload = (variantIndex, event) => {
    const file = event.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVariants((prevVariants) => {
        const newVariants = [...prevVariants];
        newVariants[variantIndex].video = file;
        newVariants[variantIndex].videoPreview = videoURL;
        return newVariants;
      });
    }
  };

  const handleImageUpload = (variantIndex, event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const imageURLs = files.map((file) => URL.createObjectURL(file));
      setVariants((prevVariants) => {
        const newVariants = [...prevVariants];
        // Clear previous images and add new ones
        newVariants[variantIndex].images = [...files];
        newVariants[variantIndex].imagePreviews = [...imageURLs];
        return newVariants;
      });
    }
  };

  const handleAnimationImageUpload = (variantIndex, event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const animationimageURLs = files.map((file) => URL.createObjectURL(file));
      setVariants((prevVariants) => {
        const newVariants = [...prevVariants];
        // Clear previous animation images and add new ones
        newVariants[variantIndex].animationimages = [...files];
        newVariants[variantIndex].animationPreviews = [...animationimageURLs];
        return newVariants;
      });
    }
  };

  /** Add New Variant */
  const addVariant = () => {
    setVariants((prev) => [...prev, { ...initialVariant }]);
  };

  /** Handle Form Submission */
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  // Validate required fields
  if (!formData.name || !formData.category || variants.length === 0) {
    alert("Please fill all required fields");
    setLoading(false);
    return;
  }

  const data = new FormData();

  // Add all product fields
  Object.keys(formData).forEach((key) => {
    data.append(key, formData[key]);
  });

  // Prepare variants data - ensure proper structure
  const preparedVariants = variants.map(variant => ({
    gender: variant.gender,
    color: variant.color,
    sizeChart: variant.sizeChart,
    sizesInfo: variant.sizesInfo
  }));

  // Stringify the variants array properly
  data.append("variants", JSON.stringify(preparedVariants));

  // Add files with correct field names
  variants.forEach((variant) => {
    const prefix = `${variant.gender}_${variant.color}`;
    
    // Add video if exists
    if (variant.video && variant.video !== "dummy-video-placeholder") {
      data.append(`video_${prefix}`, variant.video);
    }
    
    // Add images
    if (variant.images && variant.images.length > 0) {
      variant.images.forEach((image, index) => {
        data.append(`images_${prefix}`, image);
      });
    }
    
    // Add animation images
    if (variant.animationimages && variant.animationimages.length > 0) {
      variant.animationimages.forEach((animation, index) => {
        data.append(`animations_${prefix}`, animation);
      });
    }
  });

  try {
    // Debug: Log what's being sent
    console.log("FormData contents:");
    for (let [key, value] of data.entries()) {
      console.log(key, value instanceof File ? value.name : value);
    }

    const response = await addProduct(data);
    console.log("Response:", response);
    console.log("Response data:", response.data);
    if (response.data.success) {
      alert("Product added successfully!");
      // Reset form or redirect
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      request: error.request
    });
    alert(error.response?.data?.message || "Failed to add product");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center sm:p-6 ">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg sm:p-8 p-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Add Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Information Fields */}
          {["name"].map(
            (field) => (
              <div key={field} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {field}
                </label>
                <input
                  type={field === "offer" ? "number" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
                />
              </div>
            )
          )}

          {/* Short Description */}
          <div className="space-y-2 hidden">
            <label className="block text-sm font-medium text-gray-700">
              Short Description
            </label>
            <textarea
              id="short-description-editor"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg hidden"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description-editor"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg hidden"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="bestseller"
              checked={formData.bestseller}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded"
            />
            <label className="block text-sm font-medium text-gray-700">
              Bestseller
            </label>
          </div>

          {/* Variants Section */}
          {variants.map((variant, variantIndex) => (
            <div
              key={variantIndex}
              className="p-4 border rounded-lg space-y-4 bg-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                Variant {variantIndex + 1}
              </h3>

              {/* Gender & Color Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    value={variant.gender}
                    onChange={(e) =>
                      handleVariantChange(variantIndex, "gender", e.target.value)
                    }
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Color
                  </label>
                  <input
                    type="text"
                    value={variant.color}
                    onChange={(e) =>
                      handleVariantChange(variantIndex, "color", e.target.value)
                    }
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* File Uploads */}
              <label className=" hidden text-sm font-medium text-gray-700">
                Product Video
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleVideoUpload(variantIndex, e)}
                className="w-full p-2 hidden border rounded"
              />
              {variant.videoPreview && (
                <video
                  src={variant.videoPreview}
                  controls
                  className="mt-2 w-1/4 rounded-lg"
                />
              )}

              <label className="block text-sm font-medium text-gray-700">
                Animation Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleAnimationImageUpload(variantIndex, e)}
                className="w-full p-2 border rounded"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {variant.animationPreviews.map((image, i) => (
                  <img
                    key={i}
                    src={image}
                    alt={`Animation Preview ${i}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>

              <label className="block text-sm font-medium text-gray-700">
                Product Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageUpload(variantIndex, e)}
                className="w-full p-2 border rounded"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {variant.imagePreviews.map((image, i) => (
                  <img
                    key={i}
                    src={image}
                    alt={`Preview ${i}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>

              {/* Size Chart Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-md font-semibold text-gray-700">
                    Size Charts
                  </h4>
                  <button
                    type="button"
                    onClick={() => addSizeChart(variantIndex)}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                  >
                    Add Size Chart
                  </button>
                </div>

                {variant.sizeChart.map((size, sizeChartIndex) => (
                  <div key={sizeChartIndex} className="p-4 border rounded space-y-4">
                    <div className="flex justify-between items-center">
                      <h5 className="font-medium">Size Chart {sizeChartIndex + 1}</h5>
                      {variant.sizeChart.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSizeChart(variantIndex, sizeChartIndex)}
                          className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="Reference"
                        value={size.ref}
                        onChange={(e) =>
                          handleSizeChartChange(
                            variantIndex,
                            sizeChartIndex,
                            "ref",
                            e.target.value
                          )
                        }
                        className="p-2 border rounded"
                      />
                      <input
                        type="text"
                        placeholder="Label"
                        value={size.label}
                        onChange={(e) =>
                          handleSizeChartChange(
                            variantIndex,
                            sizeChartIndex,
                            "label",
                            e.target.value
                          )
                        }
                        className="p-2 border rounded"
                      />
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sizeType) => (
                        <div key={sizeType} className="space-y-1">
                          <label className="text-xs text-gray-600">{sizeType}</label>
                          <input
                            type="number"
                            value={size[sizeType]}
                            onChange={(e) =>
                              handleSizeChartChange(
                                variantIndex,
                                sizeChartIndex,
                                sizeType,
                                parseFloat(e.target.value)
                              )
                            }
                            className="w-full p-2 border rounded"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Size Info Section */}
              {variant.sizesInfo.length > 0 && (
                <>
                  <h4 className="text-md font-semibold text-gray-700">Size Info</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 border">Size</th>
                          <th className="py-2 px-4 border">Actual Price</th>
                          <th className="py-2 px-4 border">Discount Price</th>
                          <th className="py-2 px-4 border">Offer (%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {variant.sizesInfo.map((sizeInfo, sizeIndex) => (
                          <tr key={sizeIndex}>
                            <td className="py-2 px-4 border">
                              <input
                                type="text"
                                value={sizeInfo.size}
                                readOnly
                                className="w-full p-2 border rounded bg-gray-100"
                              />
                            </td>
                            <td className="py-2 px-4 border">
                              <input
                                type="number"
                                value={sizeInfo.actualPrice}
                                onChange={(e) =>
                                  handleSizesInfoChange(
                                    variantIndex,
                                    sizeIndex,
                                    "actualPrice",
                                    parseFloat(e.target.value) 
                                  )
                                }
                                className="w-full p-2 border rounded"
                              />
                            </td>
                            <td className="py-2 px-4 border">
                              <input
                                type="number"
                                value={sizeInfo.discountPrice}
                                onChange={(e) =>
                                  handleSizesInfoChange(
                                    variantIndex,
                                    sizeIndex,
                                    "discountPrice",
                                    parseFloat(e.target.value) 
                                  )
                                }
                                className="w-full p-2 border rounded"
                              />
                            </td>
                            <td className="py-2 px-4 border">
                              <input
                                type="number"
                                value={sizeInfo.offer}
                                readOnly
                                className="w-full p-2 border rounded bg-gray-100"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addVariant}
            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg"
          >
            Add Variant
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
          >
            {loading && <FaSpinner className="animate-spin" />}
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;