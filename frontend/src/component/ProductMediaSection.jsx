// import React, { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";

// const GRAPHQL_URL = "https://q3uepe-ic.myshopify.com/api/2024-04/graphql.json";
// const ACCESS_TOKEN = "76df5b05e1b2db908234960f1757df67";

// const ProductMediaSection = () => {
//     const { productId } = useParams();
//     const [additionalInfo, setAdditionalInfo] = useState("");
//     const [videos, setVideos] = useState([]);
//     const videoRefs = useRef([]);

//     // Function to render additional information from JSON
//     const renderAdditionalInfo = (info) => {
//         if (!info) return "No additional information available.";
        
//         if (typeof info === 'string') {
//             return <p>{info}</p>;
//         }
        
//         return info?.children?.map((child, index) => {
//             if (child.type === 'paragraph') {
//                 return (
//                     <p key={index} className={child.children?.[0]?.bold ? 'font-bold' : ''}>
//                         {child.children?.map((text, i) => (
//                             <span key={i}>{text.value}</span>
//                         ))}
//                     </p>
//                 );
//             }
//             return null;
//         });
//     };

//     // Fetch product data (additional information and videos)
//     useEffect(() => {
//         const fetchProductData = async () => {
//             try {
//                 const globalId = `gid://shopify/Product/${productId}`;
//                 const query = `
//           query {
//             product(id: "${globalId}") {
//               metafields(identifiers: [
//                 {namespace: "custom", key: "additional_information"},
//                 {namespace: "custom", key: "videos"}
//               ]) {
//                 key
//                 value
//               }
//             }
//           }
//         `;

//                 const res = await fetch(GRAPHQL_URL, {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN,
//                     },
//                     body: JSON.stringify({ query }),
//                 });

//                 const result = await res.json();
//                 console.log('API Response:', result);

//                 const metafields = result.data?.product?.metafields || [];

//                 // Filter out null metafields first
//                 const validMetafields = metafields.filter(meta => meta !== null);
//                 console.log('Valid Metafields:', validMetafields);

//                 // Process additional information
//                 const infoMeta = validMetafields.find(m => m && m.key === "additional_information");
//                 if (infoMeta?.value) {
//                     try {
//                         const parsedInfo = JSON.parse(infoMeta.value);
//                         setAdditionalInfo(parsedInfo);
//                         console.log('Additional Info:', parsedInfo);
//                     } catch (error) {
//                         console.error('Error parsing additional info:', error);
//                         // If it's not valid JSON, use it as a string
//                         setAdditionalInfo(infoMeta.value);
//                     }
//                 } else {
//                     console.log('No additional information found');
//                 }

//                 // Process videos
//                 const videosMeta = validMetafields.find(m => m && m.key === "videos");
//                 if (videosMeta?.value) {
//                     const videoId = videosMeta.value;
//                     console.log('Video ID:', videoId);

//                     // Query for video data using the video ID
//                     const videoQuery = `
//             query {
//               node(id: "${videoId}") {
//                 ... on Video {
//                   id
//                   sources {
//                     url
//                     mimeType
//                   }
//                 }
//               }
//             }
//           `;

//                     const videoRes = await fetch(GRAPHQL_URL, {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json",
//                             "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN,
//                         },
//                         body: JSON.stringify({ query: videoQuery }),
//                     });

//                     const videoResult = await videoRes.json();
//                     console.log('Video Data:', videoResult);

//                     // Process the video data
//                     const videoData = videoResult.data?.node?.sources || [];
//                     console.log('Processed Video Data:', videoData);
//                     setVideos(videoData);
//                 } else {
//                     console.log('No videos found');
//                 }
//             } catch (error) {
//                 console.error("Error fetching product data:", error);
//             }
//         };

//         if (productId) {
//             fetchProductData();
//         }
//     }, [productId]);

//     // Auto-play video logic using IntersectionObserver
//     useEffect(() => {
//         if (videos.length === 0) return;

//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     const video = entry.target;
//                     if (entry.isIntersecting) {
//                         video.play().catch((error) => console.error("Error playing video:", error));
//                     } else {
//                         video.pause();
//                     }
//                 });
//             },
//             { threshold: 0.5 }
//         );

//         // Initialize refs array
//         videoRefs.current = videoRefs.current.slice(0, videos.length);

//         videoRefs.current.forEach((video) => {
//             if (video) observer.observe(video);
//         });

//         return () => {
//             videoRefs.current.forEach((video) => {
//                 if (video) observer.unobserve(video);
//             });
//         };
//     }, [videos]);

//     return (
//         <div className="w-full min-h-screen">
//             {/* Additional Information Section */}
//             <div className="w-full h-screen flex sm:flex-row flex-col">
//                 <div className="sm:w-1/2 w-full h-full flex items-center justify-center p-4">
//                     <div className="text-center max-w-2xl">
//                         <div className="text-[10px] text-[#666259] py-4 leading-relaxed">
//                             {additionalInfo ? renderAdditionalInfo(additionalInfo) : "No additional information available."}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Video Section */}
//                 <div className="sm:w-1/2 w-full h-full flex items-center justify-center relative overflow-hidden">
//                     {videos.length > 0 ? (
//                         videos.map((video, idx) => (
//                             <video
//                                 key={idx}
//                                 ref={(el) => (videoRefs.current[idx] = el)}
//                                 className="absolute top-1/2 left-1/2 w-auto h-full -translate-x-1/2 -translate-y-1/2 object-contain rounded-none"
//                                 muted
//                                 loop
//                                 playsInline
//                                 preload="auto"
//                                 style={{
//                                     background: "black",
//                                 }}
//                                 onLoadedData={(e) => (e.target.style.opacity = 1)}
//                             >
//                                 <source src={video.url} type={video.mimeType} />
//                                 Your browser does not support the video tag.
//                             </video>
//                         ))
//                     ) : (
//                         <div className="w-full h-full flex flex-col items-center justify-center bg-[#666259] text-[#030100]">
//                             <h2 className="text-xs mb-2">Product Demonstration</h2>
//                             <p className="text-gray-300 text-xs">No video available</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductMediaSection;

// import React, { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";

// const GRAPHQL_URL = "https://q3uepe-ic.myshopify.com/api/2024-04/graphql.json";
// const ACCESS_TOKEN = "76df5b05e1b2db908234960f1757df67";

// const ProductMediaSection = ({ selectedColor }) => {
//     const { productId } = useParams();

//     const [blackInfo, setBlackInfo] = useState("");
//     const [beigeInfo, setBeigeInfo] = useState("");
//     const [additionalInfo, setAdditionalInfo] = useState("");

//     const [blackVideoUrl, setBlackVideoUrl] = useState(null);
//     const [beigeVideoUrl, setBeigeVideoUrl] = useState(null);

//     const videoRef = useRef(null);

//     // 🔥 Convert metafield JSON → plain text
//     const extractText = (jsonString) => {
//         try {
//             const data = JSON.parse(jsonString);

//             if (!data?.children) return "";

//             return data.children
//                 .map(block =>
//                     block.children
//                         ?.map(child => child.value || "")
//                         .join(" ")
//                 )
//                 .join("\n");
//         } catch {
//             return jsonString; // fallback text
//         }
//     };

//     // Cache video as blob
//     const fetchAndCacheVideo = async (url, setter) => {
//         try {
//             const res = await fetch(url);
//             const blob = await res.blob();
//             const objectUrl = URL.createObjectURL(blob);
//             setter(objectUrl);
//         } catch (error) {
//             console.error("VIDEO CACHE ERROR:", error);
//         }
//     };

//     const fetchVideoData = async (videoId, setCache) => {
//         try {
//             const query = `
//                 query {
//                     node(id: "${videoId}") {
//                         ... on Video {
//                             sources {
//                                 url
//                                 mimeType
//                                 height
//                             }
//                             previewImage { url }
//                         }
//                     }
//                 }
//             `;

//             const res = await fetch(GRAPHQL_URL, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN
//                 },
//                 body: JSON.stringify({ query })
//             });

//             const data = await res.json();
//             const sources = data.data?.node?.sources || [];

//             if (!sources.length) return;

//             const fastest = [...sources].sort((a, b) => a.height - b.height)[0];

//             fetchAndCacheVideo(fastest.url, setCache);

//         } catch (error) {
//             console.error("Error fetching video:", error);
//         }
//     };

//     const isVideoId = (value) =>
//         typeof value === "string" && value.startsWith("gid://shopify/Video/");

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const gid = `gid://shopify/Product/${productId}`;

//                 const query = `
//                     query {
//                         product(id: "${gid}") {
//                             metafields(identifiers: [
//                                 {namespace: "custom", key: "black_additional_information"},
//                                 {namespace: "custom", key: "black_videos"},
//                                 {namespace: "custom", key: "beige_additional_information"},
//                                 {namespace: "custom", key: "beige_videos"}
//                             ]) {
//                                 key
//                                 value
//                             }
//                         }
//                     }
//                 `;

//                 const res = await fetch(GRAPHQL_URL, {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN
//                     },
//                     body: JSON.stringify({ query })
//                 });

//                 const json = await res.json();
//                 const mf = Object.fromEntries(
//                     (json.data?.product?.metafields || []).map(m => [m.key, m.value])
//                 );

//                 // ✔ Convert RichText JSON → Plain text
//                 setBlackInfo(extractText(mf.black_additional_information || ""));
//                 setBeigeInfo(extractText(mf.beige_additional_information || ""));

//                 // ✔ Cache Black video
//                 if (mf.black_videos && isVideoId(mf.black_videos)) {
//                     fetchVideoData(mf.black_videos, setBlackVideoUrl);
//                 }

//                 // ✔ Cache Beige video
//                 if (mf.beige_videos && isVideoId(mf.beige_videos)) {
//                     fetchVideoData(mf.beige_videos, setBeigeVideoUrl);
//                 }

//             } catch (e) {
//                 console.error("Product fetch error:", e);
//             }
//         };

//         fetchProduct();
//     }, [productId]);

//     // Switch instantly between Black & Beige video + info
//     useEffect(() => {
//         if (!videoRef.current) return;

//         if (selectedColor === "Black") {
//             setAdditionalInfo(blackInfo);
//             if (blackVideoUrl) videoRef.current.src = blackVideoUrl;
//         } else {
//             setAdditionalInfo(beigeInfo);
//             if (beigeVideoUrl) videoRef.current.src = beigeVideoUrl;
//         }

//         setTimeout(() => videoRef.current?.play(), 100);

//     }, [selectedColor, blackVideoUrl, beigeVideoUrl]);


//    return (
//     <div className="w-full min-h-screen flex flex-col sm:flex-row">

//         {/* INFO */}
//         <div className="w-full sm:w-1/2 p-4 flex items-center justify-center">
//             <div className="text-[12px] text-[#666259] whitespace-pre-line">
//                 {additionalInfo}
//             </div>
//         </div>

//         {/* VIDEO */}
//         <div className="w-full sm:w-1/2 flex items-center justify-center relative overflow-hidden bg-[#0d0d0d]">
//             <video
//                 ref={videoRef}
//                 muted
//                 loop
//                 playsInline
//                 preload="auto"
//                 className="w-full h-auto sm:w-auto sm:h-full object-contain"
//             />
//         </div>

//     </div>
// );

// };

// export default ProductMediaSection;




import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

const GRAPHQL_URL = "https://q3uepe-ic.myshopify.com/api/2024-04/graphql.json";
const ACCESS_TOKEN = "76df5b05e1b2db908234960f1757df67";

const ProductMediaSection = ({ selectedColor }) => {
    const { productId } = useParams();

    const [blackInfo, setBlackInfo] = useState("");
    const [beigeInfo, setBeigeInfo] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");

    const [blackImages, setBlackImages] = useState([]);
    const [beigeImages, setBeigeImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const imageRef = useRef(null);

    // 🔥 Convert metafield JSON → plain text
    const extractText = (jsonString) => {
        try {
            const data = JSON.parse(jsonString);

            if (!data?.children) return "";

            return data.children
                .map(block =>
                    block.children
                        ?.map(child => child.value || "")
                        .join(" ")
                )
                .join("\n");
        } catch {
            return jsonString; // fallback text
        }
    };

    // Fetch image data from Shopify
    const fetchImageData = async (imageId, setImages) => {
        try {
            const query = `
                query {
                    node(id: "${imageId}") {
                        ... on MediaImage {
                            image {
                                url
                                altText
                                width
                                height
                            }
                        }
                    }
                }
            `;

            const res = await fetch(GRAPHQL_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN
                },
                body: JSON.stringify({ query })
            });

            const data = await res.json();
            const image = data.data?.node?.image;

            if (image) {
                setImages(prev => [...prev, {
                    url: image.url,
                    altText: image.altText || 'Product Image'
                }]);
            }

        } catch (error) {
            console.error("Error fetching image:", error);
        }
    };

    // Check if value is an image ID
    const isImageId = (value) =>
        typeof value === "string" && value.startsWith("gid://shopify/MediaImage/");

    // Check if value is a list of image IDs
    const isImageList = (value) => {
        try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed) && parsed.every(item => 
                typeof item === "string" && item.startsWith("gid://shopify/MediaImage/")
            );
        } catch {
            return false;
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const gid = `gid://shopify/Product/${productId}`;

                const query = `
                    query {
                        product(id: "${gid}") {
                            metafields(identifiers: [
                                {namespace: "custom", key: "black_additional_information"},
                                {namespace: "custom", key: "black_additional_information_images"},
                                {namespace: "custom", key: "beige_additional_information"},
                                {namespace: "custom", key: "beige_additional_information_images"}
                            ]) {
                                key
                                value
                            }
                        }
                    }
                `;

                const res = await fetch(GRAPHQL_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN
                    },
                    body: JSON.stringify({ query })
                });

                const json = await res.json();
                const mf = Object.fromEntries(
                    (json.data?.product?.metafields || []).map(m => [m.key, m.value])
                );

                // ✔ Convert RichText JSON → Plain text
                setBlackInfo(extractText(mf.black_additional_information || ""));
                setBeigeInfo(extractText(mf.beige_additional_information || ""));

                // Reset images
                setBlackImages([]);
                setBeigeImages([]);

                // ✔ Fetch Black images
                if (mf.black_additional_information_images) {
                    if (isImageId(mf.black_additional_information_images)) {
                        // Single image
                        fetchImageData(mf.black_additional_information_images, setBlackImages);
                    } else if (isImageList(mf.black_additional_information_images)) {
                        // Multiple images
                        const imageIds = JSON.parse(mf.black_additional_information_images);
                        imageIds.forEach(imageId => {
                            fetchImageData(imageId, setBlackImages);
                        });
                    }
                }

                // ✔ Fetch Beige images
                if (mf.beige_additional_information_images) {
                    if (isImageId(mf.beige_additional_information_images)) {
                        // Single image
                        fetchImageData(mf.beige_additional_information_images, setBeigeImages);
                    } else if (isImageList(mf.beige_additional_information_images)) {
                        // Multiple images
                        const imageIds = JSON.parse(mf.beige_additional_information_images);
                        imageIds.forEach(imageId => {
                            fetchImageData(imageId, setBeigeImages);
                        });
                    }
                }

            } catch (e) {
                console.error("Product fetch error:", e);
            }
        };

        fetchProduct();
    }, [productId]);

    // Switch between Black & Beige images + info
    useEffect(() => {
        setCurrentImageIndex(0); // Reset to first image when color changes
        
        if (selectedColor === "Black") {
            setAdditionalInfo(blackInfo);
        } else {
            setAdditionalInfo(beigeInfo);
        }
    }, [selectedColor, blackInfo, beigeInfo]);

    // Get current images based on selected color
    const currentImages = selectedColor === "Black" ? blackImages : beigeImages;

    // Handle next/previous image
    const nextImage = () => {
        if (currentImages.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
        }
    };

    const prevImage = () => {
        if (currentImages.length > 0) {
            setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col sm:flex-row">

            {/* INFO */}
            <div className="w-full sm:w-1/2 p-4 flex items-center justify-center">
                <div className="text-[12px] text-[#666259] whitespace-pre-line">
                    {additionalInfo}
                </div>
            </div>

            {/* IMAGES */}
            <div className="w-full sm:w-1/2 flex items-center justify-center relative overflow-hidden bg-[#0d0d0d]">
                {currentImages.length > 0 ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img
                            ref={imageRef}
                            src={currentImages[currentImageIndex]?.url}
                            alt={currentImages[currentImageIndex]?.altText || 'Product Image'}
                            className="w-full h-auto sm:w-auto sm:h-full object-contain max-w-full max-h-full"
                        />
                        
                        {/* Navigation arrows for multiple images */}
                        {currentImages.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                                >
                                    ‹
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                                >
                                    ›
                                </button>
                                
                                {/* Image counter */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                                    {currentImageIndex + 1} / {currentImages.length}
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="text-white text-center">
                        No images available for {selectedColor} color
                    </div>
                )}
            </div>

        </div>
    );
};

export default ProductMediaSection;
