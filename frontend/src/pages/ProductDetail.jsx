
// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { ShopContext } from '../Context/ShopContext';
// import { useParams, Link } from 'react-router-dom';
// import { FaArrowRightLong } from "react-icons/fa6";
// import { assets } from '../assets/assets';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// // import required modules
// import { Pagination, Navigation } from 'swiper/modules';

// const ProductDetail = () => {
//     // All hooks at the top level - no conditional calls
//     const { products, addToCart, currency } = useContext(ShopContext);
//     const { productId } = useParams();
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [videoSetIndex, setVideoSetIndex] = useState(0);
//     const [details, setDetails] = useState(false);
//     const [chartDetails, setChartDetails] = useState(false);
//     const [selectedSize, setSelectedSize] = useState(null);
//     const [price, setPrice] = useState(null);
//     const [discountPrice, setDiscountPrice] = useState(null);
//     const [conversionRates, setConversionRates] = useState({});
//     const sliderRef = useRef(null);
//     const [firstIndex, setFirstIndex] = useState(0);
//     const [secondIndex, setSecondIndex] = useState(0);
//     const [firstdownimage, setfirstdownimage] = useState(1);
//     const [seconddownimage, setseconddownimage] = useState(2);


//     // Fetch conversion rates
//     useEffect(() => {
//         fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
//             .then(res => res.json())
//             .then(data => {
//                 if (data && data.usd) {
//                     setConversionRates(data.usd);
//                 }
//             })
//             .catch(err => console.error("Error fetching currency rates:", err));
//     }, []);

//     useEffect(() => {
//         if (products && products.length > 0 && productId) {
//             const product = products.find((item) => String(item._id) === String(productId));
//             setSelectedProduct(product || null);

//             if (product?.variants?.[0]?.sizesInfo?.[0]) {
//                 const firstSize = product.variants[0].sizesInfo[0];
//                 setPrice(firstSize.actualPrice);
//                 setDiscountPrice(firstSize.discountPrice);
//             }
//         }
//     }, [products, productId]);

//     // Move all derived state calculations after hooks
//     const variant = selectedProduct?.variants?.[0] || {};
//     const firstVariantIndex = videoSetIndex * 2;
//     const secondVariantIndex = videoSetIndex * 2 + 1;

//     const firstImages = selectedProduct?.variants[firstVariantIndex]?.animationimages || [];
//     const secondImages = selectedProduct?.variants[secondVariantIndex]?.animationimages || [];

//     // Image rotation effect - now safe because we have fallback empty arrays
//     useEffect(() => {
//         if (firstImages.length === 0 && secondImages.length === 0) return;

//         const interval = setInterval(() => {
//             if (firstImages.length > 0) {
//                 setFirstIndex(prev => (prev + 1) % firstImages.length);
//             }
//             if (secondImages.length > 0) {
//                 setSecondIndex(prev => (prev + 1) % secondImages.length);
//             }
//         }, 900);

//         return () => clearInterval(interval);
//     }, [firstImages.length, secondImages.length]);

//     const convertPrice = (priceInUSD, selectedCurrency) => {
//         const rate = conversionRates[selectedCurrency.toLowerCase()] || 1;
//         return (priceInUSD * rate).toFixed(2);
//     };

//     const handleSizeSelect = (size) => {
//         setSelectedSize(size);
//         const selectedSizeInfo = selectedProduct?.variants?.[0]?.sizesInfo?.find((s) => s.size === size);
//         if (selectedSizeInfo) {
//             setPrice(selectedSizeInfo.actualPrice);
//             setDiscountPrice(selectedSizeInfo.discountPrice);
//         }
//     };

//     if (!selectedProduct) {
//         return <p className='p-4'>Product not found. Please select a valid product.</p>;
//     }

//     // Mobile media setup
//     const mobileVideos = [];
//     const mobileImages = [];
//     const img1 = variant.images?.[1];
//     const img2 = variant.images?.[2];

//     if (img1) mobileImages.push({ type: 'image', src: img1 });
//     if (img2) mobileImages.push({ type: 'image', src: img2 });

//     [firstVariantIndex, secondVariantIndex].forEach(index => {
//         const current = selectedProduct.variants[index];
//         if (current?.videoUrl) {
//             mobileVideos.push({ type: 'video', src: current.videoUrl });
//         }
//     });

//     const mobileMediaItems = [...mobileVideos, ...mobileImages];

//     const hangechangecolor = (index) => {

//         setVideoSetIndex(index / 2);
//         if (firstdownimage == 1) {
//             setfirstdownimage(2);
//             if (variant.images.length == 6) {
//                 setseconddownimage(4);
//                 setfirstdownimage(3);
//             }
//         } else {

//             setfirstdownimage(1);
//             if (variant.images.length == 6) {
//                 setseconddownimage(2);
//             }
//         }

//     }

//     return (
//         <>
//             <div className='w-10/12 m-auto'>
//                 <div className="fixed inset-0 flex left-0 justify-center items-center pointer-events-none z-10">
//                     <img src={assets.s4} alt="Logo" className="w-70 mix-blend-multiply opacity-40" />
//                 </div>



//                 {/* Mobile View with Swiper */}
//                 <div className="lg:hidden block mb-30">
//                     <Swiper
//                         slidesPerView={1}
//                         spaceBetween={10}
//                         pagination={{
//                             clickable: true,
//                         }}
//                         navigation={false}
//                         modules={[Pagination, Navigation]}
//                         className="mySwiper"
//                     >
//                         {/* Animation images slides */}
//                         <SwiperSlide>
//                             <div className='flex'>
//                                 {firstImages.length > 0 && (
//                                     <div className="w-[50%]">
//                                         <img
//                                             src={`https://rogue0707.com${firstImages[firstIndex]}`}
//                                             alt="First Variant Animation"
//                                             className="w-full max-h-[400px] object-contain"
//                                         />
//                                     </div>
//                                 )}
//                                 {secondImages.length > 0 && (
//                                     <div className="w-[50%]">
//                                         <img
//                                             src={`https://rogue0707.com${secondImages[secondIndex]}`}
//                                             alt="Second Variant Animation"
//                                             className="w-full max-h-[400px] object-contain"
//                                         />
//                                     </div>
//                                 )}
//                             </div>
//                         </SwiperSlide>

//                         {/* Static images - matching desktop view */}
//                         {variant.images?.[1] && (
//                             <SwiperSlide>
//                                 <div className="w-full">
//                                     <img
//                                         src={`https://rogue0707.com${variant.images[firstdownimage]}`}
//                                         alt={selectedProduct.name}
//                                         className="w-full max-h-[400px] object-contain"
//                                     />
//                                 </div>
//                             </SwiperSlide>
//                         )}

//                         {variant.images?.length === 6 && variant.images?.[2] && (
//                             <SwiperSlide>
//                                 <div className="w-full">
//                                     <img
//                                         src={`https://rogue0707.com${variant.images[seconddownimage]}`}
//                                         alt={selectedProduct.name}
//                                         className="w-full max-h-[400px] object-contain"
//                                     />
//                                 </div>
//                             </SwiperSlide>
//                         )}



//                         {/* {variant.images?.length === 6 && variant.images[4] && (
//             <SwiperSlide>
//                 <div className="w-full">
//                     <img
//                         src={`https://rogue0707.com${variant.images[4]}`}
//                         alt={selectedProduct.name}
//                         className="w-full max-h-[400px] object-contain"
//                     />
//                 </div>
//             </SwiperSlide>
//         )}

//         {variant.images?.length === 6 && variant.images[5] && (
//             <SwiperSlide>
//                 <div className="w-full">
//                     <img
//                         src={`https://rogue0707.com${variant.images[5]}`}
//                         alt={selectedProduct.name}
//                         className="w-full max-h-[400px] object-contain"
//                     />
//                 </div>
//             </SwiperSlide>
//         )} */}
//                     </Swiper>
//                 </div>

//                 {/* Desktop View */}
//                 <div className='grid grid-cols-1 lg:grid-cols-10 sm:ml-[30px] ml-0 md:gap-2'>
//                     {/* Left Panel */}
//                     <div className='lg:col-span-3  product_cont'>
//                         <div className='sticky lg:fixed w-full top-[50%] transform translate-y-[-50%]'>
//                             <h4 className='text-[8px] uppercase text-[#A9ABAE] font-medium'>{selectedProduct.name}</h4>

//                             <div className="price-display mt-[-10px]">
//                                 {discountPrice !== price ? (
//                                     <span className="text-[8px] text-[#A9ABAE]">
//                                         {Number(convertPrice(discountPrice, currency))?.toLocaleString(undefined, {
//                                             minimumFractionDigits: 2,
//                                             maximumFractionDigits: 2,
//                                         })} {currency}
//                                     </span>

//                                 ) : (
//                                     <span className="text-[8px] text-[#A9ABAE]">
//                                         ${price?.toFixed(2)} USD
//                                     </span>
//                                 )}
//                             </div>

//                             <h4 className='text-[8px] uppercase text-[#A9ABAE] font-medium'>INCLUSIVE OF TAXES. DUTIES ON ARRIVAL.</h4>

//                             {/* Colors */}
//                             <div className='flex gap-3 my-5'>
//                                 {selectedProduct.variants.map((v, index) =>
//                                     index % 2 === 0 ? (
//                                         <div
//                                             key={index}
//                                             className={`w-4 h-4 rounded-full cursor-pointer border ${videoSetIndex === index / 2 ? 'ring-2 ring-[#605B55]' : ''}`}
//                                             style={{ backgroundColor: v.color }}
//                                             onClick={() => hangechangecolor(index)}
//                                         />
//                                     ) : null
//                                 )}
//                             </div>

//                             {/* Size Selector */}
//                             <div className="flex space-x-4 my-3 space-y-3">
//                                 {variant.sizesInfo.map((size, index) => (
//                                     <span
//                                         key={index}
//                                         onClick={() => handleSizeSelect(size.size)}
//                                         className={`w-6 h-6 items-center flex justify-center rounded text-[8px] text-[#d2d3d4] cursor-pointer ${selectedSize === size.size ? "bg-gray-200 text-black" : "bg-[#605B55] hover:bg-gray-200 hover:text-black"
//                                             }`}
//                                     >
//                                         {size.size}
//                                     </span>
//                                 ))}
//                             </div>

//                             {/* Add to Bag */}
//                             <div className="flex justify-center relative max-w-[280px] py-2 my-3 text-[8px] text-[#D2D3D5] cursor-pointer bg-[#605B55] rounded-2xl shadow-amber-100 items-center">
//                                 {selectedSize ? (
//                                     <Link to="/cart" onClick={() => addToCart(selectedProduct, selectedSize)}>
//                                         <button>Add to bag</button>
//                                     </Link>
//                                 ) : (
//                                     <button>Please Select Size</button>
//                                 )}
//                                 <div className="absolute right-3">
//                                     <FaArrowRightLong />
//                                 </div>
//                             </div>

//                             {/* Product Details */}
//                             <div className='p-0 m-0'>
//                                 <button onClick={() => setDetails(!details)} className="cursor-pointer text-[8px] text-[#A9ABAE] rounded-lg">
//                                     Product Details {details ? "-" : "+"}
//                                 </button>
//                                 {details && (
//                                     <div
//                                         className="my-1 text-[8px] text-[#A9ABAE] sm:max-w-[300px] w-full overflow-y-auto"
//                                         dangerouslySetInnerHTML={{ __html: selectedProduct.description }}
//                                     />
//                                 )}
//                             </div>


//                             {/* Chart Details */}
//                             <div className='p-0 m-0 mt-[-10px]'>
//                                 <button onClick={() => setChartDetails(!chartDetails)} className='cursor-pointer text-[8px] text-[#A9ABAE] rounded-lg'>
//                                     Size  Chart  {chartDetails ? "-" : "+"}
//                                 </button>

//                             </div>
//                         </div>
//                     </div>

//                     {chartDetails && (
//                         <div className='fixed top-[50%] transform translate-y-[-50%] flex flex-row  left-0 w-[100%]  z-50 text-[10px] text-[#d2d2d4]'>
//                             <div className="z-50 left-4 bg-black/50 w-fit p-6 rounded-lg   relative">
//                                 <div className='sm:flex space-y-4 sm:space-y-0 gap-16 sm:items-center sm:justify-center'>
//                                     <div className='bg-[#7f7f7f50] w-[250px] z-50 left-4 relative border'>
//                                         <button className="absolute top-0 right-0 text-[10px] border w-6 h-6 font-bold bg-white text-black z-50"
//                                             onClick={() => setChartDetails(false)}>
//                                             ✖
//                                         </button>
//                                         {
//                                             variant.images.length === 6 ? (
//                                                 <img
//                                                     src={`https://rogue0707.com${variant.images[5]}`}
//                                                     alt={selectedProduct.name}
//                                                     className='object-cover h-[132px] m-auto'
//                                                 />
//                                             ) : (
//                                                 <img
//                                                     src={`https://rogue0707.com${variant.images[3]}`}
//                                                     alt={selectedProduct.name}
//                                                     className='object-cover h-[132px] m-auto'
//                                                 />
//                                             )
//                                         }

//                                     </div>
//                                     <div className="sm:max-w-4xl max-w-3xl border border-gray-300 shadow-md">
//                                         <table className="w-full text-center">
//                                             <thead>
//                                                 <tr className="text-[8px]">
//                                                     <th className="py-1">Ref</th>
//                                                     <th className="py-1">Measurement (cm)</th>
//                                                     {variant.sizesInfo.map((s) => (
//                                                         <th key={s.size} className="py-1">{s.size}</th>
//                                                     ))}
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {variant.sizeChart.map((item, index) => (
//                                                     <tr key={index} className="text-[8px]">
//                                                         <td className="px-4 py-1">{item.ref}</td>
//                                                         <td className="px-4 py-1">{item.label}</td>
//                                                         {variant.sizesInfo.map((s) => (
//                                                             <td key={s.size} className="px-4 py-1">{item[s.size]}</td>
//                                                         ))}
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Right Media Panel - Desktop */}
//                     <div className='lg:col-span-7 relative lg:block hidden'>
//                         <div className='relative flex items-center justify-center transition-all duration-500 ease-in-out'>
//                             <div className="flex md:gap-10 w-full mt-[-45px]    2xl:mt-[-100px] justify-end items-center overflow-hidden h-auto ">
//                                 <div className="animation-image-container">
//                                     {firstImages.length > 0 && (
//                                         <img
//                                             src={`https://rogue0707.com${firstImages[firstIndex]}`}
//                                             className="heightimage"
//                                             alt="First Variant Animation"
//                                         />
//                                     )}
//                                 </div>
//                                 <div className="animation-image-container">
//                                     {secondImages.length > 0 && (
//                                         <img
//                                             src={`https://rogue0707.com${secondImages[secondIndex]}`}
//                                             className=" heightimage"
//                                             alt="Second Variant Animation"
//                                         />
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                         <div className='mt-[15vh]'>

//                             <img
//                                 src={`https://rogue0707.com${variant.images[firstdownimage]}`}
//                                 alt={selectedProduct.name}
//                                 className='object-cover sm:max-w-[600px] mb-8 float-right w-full'
//                             />



//                             {
//                                 variant.images.length === 6 && (
//                                     <img
//                                         src={`https://rogue0707.com${variant.images[seconddownimage]}`}
//                                         alt={selectedProduct.name}
//                                         className='object-cover sm:max-w-[600px] mb-3 float-right w-full'
//                                     />
//                                 )
//                             }
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ProductDetail;



// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { FaArrowRightLong } from 'react-icons/fa6';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import { assets } from '../assets/assets';
// import { addToCart } from '../utils/shopifyCart';
// import { useContext } from 'react';
// import { ShopContext } from '../Context/ShopContext';
// import CloseupImages from '../component/CloseupImages';
// import ProductMediaSection from '../component/ProductMediaSection';

// const GRAPHQL_URL = 'https://q3uepe-ic.myshopify.com/api/2024-04/graphql.json';
// const ACCESS_TOKEN = '76df5b05e1b2db908234960f1757df67';

// const ProductDetail = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedColor, setSelectedColor] = useState('Black');
//   const [details, setDetails] = useState(false);
//   const [chartDetails, setChartDetails] = useState(false);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [usdToCurrencyRate, setUsdToCurrencyRate] = useState(1);
//   const { currency } = useContext(ShopContext);
  
//   // Image states
//   const [chartImage, setChartImage] = useState(null);
//   const [measurementImage, setMeasurementImage] = useState(null);
//   const [closeupBlackImages, setCloseupBlackImages] = useState([]);
//   const [closeupBeigeImages, setCloseupBeigeImages] = useState([]);
//   const [mainBlackImages, setMainBlackImages] = useState([]);
//   const [mainBeigeImages, setMainBeigeImages] = useState([]);
  
//   // Current displayed images based on selected color
//   const [currentMainImages, setCurrentMainImages] = useState([]);
//   const [currentCloseupImages, setCurrentCloseupImages] = useState([]);

//   // Extract available colors from product variants
//   const colors = [];
//   if (product) {
//     const colorSet = new Set();
//     product.variants.edges.forEach(({ node }) => {
//       const colorOption = node.selectedOptions.find(opt => opt.name.toLowerCase() === 'color');
//       if (colorOption) {
//         colorSet.add(colorOption.value);
//       }
//     });
//     colorSet.forEach(color => {
//       colors.push({
//         name: color,
//         bg: color,
//       });
//     });
//   }

//   useEffect(() => {
//     if (currency.toLowerCase() === "inr") {
//       setUsdToCurrencyRate(1);
//     } else {
//       fetch(
//         "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json"
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           if (data?.inr && data.inr[currency.toLowerCase()]) {
//             setUsdToCurrencyRate(data.inr[currency.toLowerCase()]);
//           } else {
//             console.warn("Currency not found:", currency);
//             setUsdToCurrencyRate(1);
//           }
//         })
//         .catch((err) => {
//           console.error("Currency fetch error:", err);
//           setUsdToCurrencyRate(1);
//         });
//     }
//   }, [currency]);

//   // Fetch all metafield images
//   useEffect(() => {
//     const fetchAllMetafieldImages = async () => {
//       try {
//         const globalId = `gid://shopify/Product/${productId}`;
//         const query = `
//           query getProduct($id: ID!) {
//             product(id: $id) {
//               id
//               title
//               metafields(identifiers: [
//                 {namespace: "custom", key: "chart_image"},
//                 {namespace: "custom", key: "measurement"},
//                 {namespace: "custom", key: "clouseup_black_images"},
//                 {namespace: "custom", key: "clouseup_beige_images"},
//                 {namespace: "custom", key: "black_images"},
//                 {namespace: "custom", key: "beige_images"}
//               ]) {
//                 key
//                 namespace
//                 value
//                 reference {
//                   ... on MediaImage {
//                     image {
//                       url
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         `;

//         const res = await fetch(GRAPHQL_URL, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN,
//           },
//           body: JSON.stringify({ 
//             query,
//             variables: { id: globalId }
//           }),
//         });

//         const result = await res.json();
//         console.log("All Metafields result:", result);
        
//         const metafields = result.data?.product?.metafields || [];

//         // Chart image
//         const chartMeta = metafields.find((m) => m.key === "chart_image");
//         if (chartMeta) {
//           if (chartMeta.reference?.image?.url) {
//             setChartImage(chartMeta.reference.image.url);
//           } else if (chartMeta.value) {
//             setChartImage(chartMeta.value);
//           }
//         }

//         // Measurement image
//         const measurementMeta = metafields.find((m) => m.key === "measurement");
//         if (measurementMeta) {
//           if (measurementMeta.reference?.image?.url) {
//             setMeasurementImage(measurementMeta.reference.image.url);
//           } else if (measurementMeta.value) {
//             setMeasurementImage(measurementMeta.value);
//           }
//         }

//         // Closeup Black Images
//         const closeupBlackMeta = metafields.find((m) => m.key === "clouseup_black_images");
//         if (closeupBlackMeta?.value) {
//           try {
//             const mediaIds = JSON.parse(closeupBlackMeta.value);
//             const blackUrls = await fetchMediaUrls(mediaIds);
//             setCloseupBlackImages(blackUrls);
//           } catch (error) {
//             console.error("Error parsing closeup black images:", error);
//           }
//         }

//         // Closeup Beige Images
//         const closeupBeigeMeta = metafields.find((m) => m.key === "clouseup_beige_images");
//         if (closeupBeigeMeta?.value) {
//           try {
//             const mediaIds = JSON.parse(closeupBeigeMeta.value);
//             const beigeUrls = await fetchMediaUrls(mediaIds);
//             setCloseupBeigeImages(beigeUrls);
//           } catch (error) {
//             console.error("Error parsing closeup beige images:", error);
//           }
//         }

//         // Main Black Images
//         const mainBlackMeta = metafields.find((m) => m.key === "black_images");
//         if (mainBlackMeta?.value) {
//           try {
//             const mediaIds = JSON.parse(mainBlackMeta.value);
//             const blackMainUrls = await fetchMediaUrls(mediaIds);
//             setMainBlackImages(blackMainUrls);
//           } catch (error) {
//             console.error("Error parsing main black images:", error);
//           }
//         }

//         // Main Beige Images
//         const mainBeigeMeta = metafields.find((m) => m.key === "beige_images");
//         if (mainBeigeMeta?.value) {
//           try {
//             const mediaIds = JSON.parse(mainBeigeMeta.value);
//             const beigeMainUrls = await fetchMediaUrls(mediaIds);
//             setMainBeigeImages(beigeMainUrls);
//           } catch (error) {
//             console.error("Error parsing main beige images:", error);
//           }
//         }

//       } catch (error) {
//         console.error("Error fetching metafield images:", error);
//       }
//     };

//     const fetchMediaUrls = async (mediaIds) => {
//       if (!mediaIds || mediaIds.length === 0) return [];

//       const mediaQuery = `
//         query {
//           nodes(ids: ${JSON.stringify(mediaIds)}) {
//             ... on MediaImage {
//               id
//               image {
//                 url
//               }
//             }
//           }
//         }
//       `;

//       const mediaRes = await fetch(GRAPHQL_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN,
//         },
//         body: JSON.stringify({ query: mediaQuery }),
//       });

//       const mediaResult = await mediaRes.json();
//       return mediaResult.data?.nodes
//         ?.map((node) => node?.image?.url)
//         .filter(Boolean) || [];
//     };

//     if (productId) {
//       fetchAllMetafieldImages();
//     }
//   }, [productId]);

//   // Update current images when color changes or images are loaded
//   useEffect(() => {
//     if (selectedColor === 'Black') {
//       setCurrentMainImages(mainBlackImages);
//       setCurrentCloseupImages(closeupBlackImages);
//     } else {
//       setCurrentMainImages(mainBeigeImages);
//       setCurrentCloseupImages(closeupBeigeImages);
//     }
//   }, [selectedColor, mainBlackImages, mainBeigeImages, closeupBlackImages, closeupBeigeImages]);

//   // Fetch main product data (for variants, description, etc.)
//   useEffect(() => {
//     const fetchProduct = async () => {
//       const globalId = `gid://shopify/Product/${productId}`;
//       const query = `
//         query {
//           product(id: "${globalId}") {
//             id
//             title
//             descriptionHtml
//             variants(first: 100) {
//               edges {
//                 node {
//                   id
//                   title
//                   quantityAvailable
//                   price {
//                     amount
//                     currencyCode
//                   }
//                   selectedOptions {
//                     name
//                     value
//                   }
//                 }
//               }
//             }
//           }
//         }
//       `;

//       const res = await fetch(GRAPHQL_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN,
//         },
//         body: JSON.stringify({ query }),
//       });

//       const result = await res.json();
//       const productData = result.data?.product;

//       if (productData) {
//         setProduct(productData);
//         if (productData.variants.edges.length > 0) {
//           setSelectedVariant(productData.variants.edges[0].node);
//           const colorOption = productData.variants.edges[0].node.selectedOptions.find(
//             opt => opt.name.toLowerCase() === 'color'
//           );
//           if (colorOption) {
//             setSelectedColor(colorOption.value);
//           }
//         }
//       }
//     };
//     fetchProduct();
//   }, [productId]);

//   const handleColorChange = (color) => {
//     setSelectedColor(color);
//     setSelectedSize(null);
//   };

//   const handleSizeSelect = (size) => {
//     setSelectedSize(size);
//     if (product) {
//       const selectedVariant = product.variants.edges.find(({ node }) => {
//         const colorOption = node.selectedOptions.find(opt => opt.name.toLowerCase() === 'color');
//         const sizeOption = node.selectedOptions.find(opt => opt.name.toLowerCase() === 'size');
//         return colorOption?.value === selectedColor && sizeOption?.value === size;
//       });
//       if (selectedVariant) {
//         setSelectedVariant(selectedVariant.node);
//       }
//     }
//   };

//   if (!product) return <p className="text-center text-gray-300 mt-12">Loading...</p>;

//   // Extract available sizes for the selected color with stock check
//   const availableSizes = [];
//   if (product) {
//     const sizeSet = new Set();
//     product.variants.edges.forEach(({ node }) => {
//       const colorOption = node.selectedOptions.find(opt => opt.name.toLowerCase() === 'color');
//       const sizeOption = node.selectedOptions.find(opt => opt.name.toLowerCase() === 'size');
//       if (colorOption?.value === selectedColor && sizeOption && node.quantityAvailable > 0) {
//         sizeSet.add(sizeOption.value);
//       }
//     });
//     sizeSet.forEach(size => availableSizes.push({ size }));
//   }

//   const selectedProduct = {
//     name: product.title,
//     description: product.descriptionHtml,
//     price: parseFloat(selectedVariant?.price.amount || '0') * usdToCurrencyRate,
//     discountPrice: parseFloat(selectedVariant?.price.amount || '0') * usdToCurrencyRate * 0.9,
//   };

//   const convertPrice = (price, currency) => {
//     return new Intl.NumberFormat('INR', {
//       currency: currency,
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 2
//     }).format(price);
//   };

//   return (
//     <>
//       <div className='w-10/12 mx-auto'>
//         <div className="fixed inset-0 flex left-0 justify-center items-center pointer-events-none z-10">
//           <img src={assets.s4} alt="Logo" className="w-70 mix-blend-multiply opacity-40" />
//         </div>

//         {/* Mobile View */}
//         <div className='block lg:hidden'>
//           <div className="product_cont flex flex-col justify-center mb-8">
//             <div className="relative">
//               <Swiper
//                 slidesPerView={1}
//                 spaceBetween={30}
//                 pagination={{
//                   clickable: true,
//                   dynamicBullets: true,
//                 }}
//                 autoplay={{
//                   delay: 3500,
//                   disableOnInteraction: false,
//                 }}
//                 loop={true}
//                 navigation={{
//                   nextEl: ".mobile-swiper-next",
//                   prevEl: ".mobile-swiper-prev",
//                 }}
//                 modules={[Pagination, Navigation]}
//                 className="productSwiper"
//               >
//                 {currentMainImages.map((url, index) => (
//                   <SwiperSlide key={index}>
//                     <div className="w-full h-[60vh] flex items-center justify-center">
//                       <img
//                         src={url}
//                         alt={`${selectedColor} Slide ${index}`}
//                         className="max-h-[60vh] w-auto object-contain transition-transform duration-700"
//                       />
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>

//               <div className="mobile-swiper-prev absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#666259] text-3xl z-20">
//                 ❮
//               </div>
//               <div className="mobile-swiper-next absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#666259] text-3xl z-20">
//                 ❯
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Desktop View */}
//         <div className='lg:grid grid-cols-1 lg:grid-cols-10 sm:ml-[30px] ml-0 md:gap-2'>
//           {/* Left Panel */}
//           <div className='lg:col-span-5 product_cont flex flex-col mt-0 justify-center'>
//             <div className='w-full'>
//               <h4 className='text-[8px] uppercase text-[#666259] font-medium'>{selectedProduct.name}</h4>

//               <div className="price-display mt-[-10px]">
//                 {selectedProduct.discountPrice !== selectedProduct.price ? (
//                   <span className="text-[8px] text-[#666259]">
//                     {convertPrice(selectedProduct.price, currency)} {currency}
//                   </span>
//                 ) : (
//                   <span className="text-[8px] text-[#666259]">
//                     {convertPrice(selectedProduct.price, currency)}
//                   </span>
//                 )}
//               </div>

//               <h4 className='text-[8px] uppercase text-[#666259] font-medium'>INCLUSIVE OF TAXES.DUTIES ON ARRIVAL.</h4>

//               {/* Colors */}
//               <div className='flex gap-3 my-5'>
//                 {colors.map((color, index) => (
//                   <div
//                     key={index}
//                     className={`w-4 h-4 rounded-full cursor-pointer border ${selectedColor === color.name ? 'ring-2 ring-[#605B55]' : ''}`}
//                     style={{ backgroundColor: color.bg }}
//                     onClick={() => handleColorChange(color.name)}
//                   />
//                 ))}
//               </div>

//               {/* Size Selector */}
//               <div className="flex flex-wrap gap-2 my-3">
//                 {product?.variants.edges
//                   .filter(({ node }) => {
//                     const colorOption = node.selectedOptions.find(opt => opt.name.toLowerCase() === 'color');
//                     return colorOption?.value === selectedColor;
//                   })
//                   .map(({ node }) => {
//                     const sizeOption = node.selectedOptions.find(opt => opt.name.toLowerCase() === 'size');
//                     const isOutOfStock = node.quantityAvailable === 0;
//                     return (
//                       <span
//                         key={node.id}
//                         onClick={() => !isOutOfStock && handleSizeSelect(sizeOption.value)}
//                         className={`w-6 h-6 items-center flex justify-center rounded text-[8px] text-[#030100] cursor-pointer
//           ${selectedSize === sizeOption.value ? "bg-[#666259] text-[#030100]" : "bg-[#605B55] hover:bg-gray-200 hover:text-black"}
//           ${isOutOfStock ? "opacity-40 cursor-not-allowed" : ""}`}
//                       >
//                         {sizeOption.value}
//                       </span>
//                     );
//                   })}
//               </div>

//               {/* Add to Bag */}
//               <div className="flex justify-center relative max-w-[280px] py-2 my-3 text-[8px] bg-[#666259] text-[#030100] cursor-pointer rounded-2xl shadow-amber-100 items-center">
//                 {selectedSize ? (
//                   selectedVariant?.quantityAvailable > 0 ? (
//                     <button
//                       onClick={async () => {
//                         try {
//                           const cart = await addToCart(selectedVariant.id, 1);
//                           if (cart) {
//                             window.location.href = '/cart';
//                           } else {
//                             alert("Failed to add to cart.");
//                           }
//                         } catch (err) {
//                           alert("Something went wrong.");
//                           console.error(err);
//                         }
//                       }}
//                     >
//                       Add to Cart
//                     </button>
//                   ) : (
//                     <button disabled className="opacity-60 cursor-not-allowed">
//                       Out of Stock
//                     </button>
//                   )
//                 ) : (
//                   <button>Please Select Size</button>
//                 )}
//                 <div className="absolute right-3">
//                   <FaArrowRightLong  />
//                 </div>
//               </div>

//               {/* Product Details */}
//               <div className='p-0 m-0'>
//                 <button onClick={() => setDetails(!details)} className="cursor-pointer text-[8px] text-[#666259] rounded-lg">
//                   Product Details {details ? "-" : "+"}
//                 </button>
//                 {details && (
//                   <div
//                     className="my-1 text-[8px] text-[#666259] sm:max-w-[300px] w-full overflow-y-auto"
//                     dangerouslySetInnerHTML={{ __html: selectedProduct.description }}
//                   />
//                 )}
//               </div>

//               {/* Chart Details */}
//               <div className='p-0 m-0 mt-[-10px]'>
//                 <button onClick={() => setChartDetails(!chartDetails)} className='cursor-pointer text-[8px] text-[#666259] rounded-lg'>
//                   SIZE CHART {chartDetails ? "-" : "+"}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {chartDetails && (
//             <div className='fixed top-[50%] transform translate-y-[-50%] flex flex-row left-0 w-[100%] z-50 text-[10px] text-[#666259]'>
//               <div className="z-50 left-4 bg-black/50 w-fit p-6 rounded-lg relative">
//                 <div className='sm:flex space-y-4 sm:space-y-0 gap-16 sm:items-center sm:justify-center'>
//                   <div className='bg-[#7f7f7f50] sm:flex sm:items-center sm:justify-center w-[250px] z-50 sm:left-4 left-0 relative border'>
//                     <button
//                       className="absolute top-0 right-0 text-[10px] border w-6 h-6 font-bold bg-[#666259] text-[#030100] z-50"
//                       onClick={() => setChartDetails(false)}
//                     >
//                       ✖
//                     </button>
//                     {chartImage ? (
//                       <img
//                         src={chartImage}
//                         alt="Size Chart"
//                         className='h-[180px] p-5 object-contain'
//                       />
//                     ) : (
//                       <div className="h-[180px] w-full flex items-center justify-center text-[#666259]">
//                         Size chart not available
//                       </div>
//                     )}
//                   </div>

//                   <div className="sm:max-w-4xl max-w-3xl border border-gray-300 shadow-md">
//                     {measurementImage ? (
//                       <img
//                         src={measurementImage}
//                         alt="Measurement Chart"
//                         className='object-cover h-[132px] bg-[#605B55] w-full'
//                       />
//                     ) : (
//                       <div className="h-[132px] w-full flex items-center justify-center text-[#666259] bg-[#605B55]">
//                         Measurement chart not available
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Right Media Panel - Desktop */}
//           <div className="lg:col-span-5 product_cont hidden sm:flex flex-col justify-center order-2 lg:order-1">
//             <div className="relative">
//               <Swiper
//                 slidesPerView={1}
//                 spaceBetween={30}
//                 pagination={{
//                   clickable: true,
//                   dynamicBullets: true,
//                 }}
//                 autoplay={{
//                   delay: 3500,
//                   disableOnInteraction: false,
//                 }}
//                 loop={true}
//                 navigation={{
//                   nextEl: ".swiper-button-next-custom",
//                   prevEl: ".swiper-button-prev-custom",
//                 }}
//                 modules={[Pagination, Navigation]}
//                 className="productSwiper"
//               >
//                 {currentMainImages.map((url, index) => (
//                   <SwiperSlide key={index}>
//                     <div className="w-full h-[80vh] flex items-center justify-center">
//                       <img
//                         src={url}
//                         alt={`${selectedColor} Slide ${index}`}
//                         className="max-h-[80vh] w-auto object-contain transition-transform duration-700"
//                       />
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>

//               <div className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#666259] text-3xl z-20">
//                 ❮
//               </div>
//               <div className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#666259] text-3xl z-20">
//                 ❯
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Closeup Images - Pass selected color and images as props */}
//         <CloseupImages 
//           closeupImages={currentCloseupImages} 
//           selectedColor={selectedColor} 
//         />
        
//         <ProductMediaSection />
//       </div>
//     </>
//   );
// };

// export default ProductDetail;





import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { assets } from '../assets/assets';
import { addToCart } from '../utils/shopifyCart';
import { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import CloseupImages from '../component/CloseupImages';
import ProductMediaSection from '../component/ProductMediaSection';

const GRAPHQL_URL = 'https://q3uepe-ic.myshopify.com/api/2024-04/graphql.json';
const ACCESS_TOKEN = '76df5b05e1b2db908234960f1757df67';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [details, setDetails] = useState(false);
  const [chartDetails, setChartDetails] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [usdToCurrencyRate, setUsdToCurrencyRate] = useState(1);
  const { currency } = useContext(ShopContext);
  
  // Image states
  const [chartImage, setChartImage] = useState(null);
  const [measurementImage, setMeasurementImage] = useState(null);
  const [closeupBlackImages, setCloseupBlackImages] = useState([]);
  const [closeupBeigeImages, setCloseupBeigeImages] = useState([]);
  const [mainBlackImages, setMainBlackImages] = useState([]);
  const [mainBeigeImages, setMainBeigeImages] = useState([]);
  
  // Current displayed images based on selected color
  const [currentMainImages, setCurrentMainImages] = useState([]);
  const [currentCloseupImages, setCurrentCloseupImages] = useState([]);

  // Extract available colors from product variants
  const colors = [];
  if (product) {
    const colorSet = new Set();
    product.variants.edges.forEach(({ node }) => {
      const colorOption = node.selectedOptions.find(opt => opt.name.toLowerCase() === 'color');
      if (colorOption) {
        colorSet.add(colorOption.value);
      }
    });
    colorSet.forEach(color => {
      colors.push({
        name: color,
        bg: color,
      });
    });
  }

  useEffect(() => {
    if (currency.toLowerCase() === "inr") {
      setUsdToCurrencyRate(1);
    } else {
      fetch(
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json"
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.inr && data.inr[currency.toLowerCase()]) {
            setUsdToCurrencyRate(data.inr[currency.toLowerCase()]);
          } else {
            console.warn("Currency not found:", currency);
            setUsdToCurrencyRate(1);
          }
        })
        .catch((err) => {
          console.error("Currency fetch error:", err);
          setUsdToCurrencyRate(1);
        });
    }
  }, [currency]);

  // Fetch all metafield images
  useEffect(() => {
    const fetchAllMetafieldImages = async () => {
      try {
        const globalId = `gid://shopify/Product/${productId}`;
        const query = `
          query getProduct($id: ID!) {
            product(id: $id) {
              id
              title
              metafields(identifiers: [
                {namespace: "custom", key: "chart_image"},
                {namespace: "custom", key: "measurement"},
                {namespace: "custom", key: "clouseup_black_images"},
                {namespace: "custom", key: "clouseup_beige_images"},
                {namespace: "custom", key: "black_images"},
                {namespace: "custom", key: "beige_images"}
              ]) {
                key
                namespace
                value
                reference {
                  ... on MediaImage {
                    image {
                      url
                    }
                  }
                }
              }
            }
          }
        `;

        const res = await fetch(GRAPHQL_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN,
          },
          body: JSON.stringify({ 
            query,
            variables: { id: globalId }
          }),
        });

        const result = await res.json();
        console.log("All Metafields result:", result);
        
        const metafields = result.data?.product?.metafields || [];

        // Filter out null metafields first
        const validMetafields = metafields.filter(meta => meta !== null);

        // Chart image
        const chartMeta = validMetafields.find((m) => m.key === "chart_image");
        if (chartMeta) {
          if (chartMeta.reference?.image?.url) {
            setChartImage(chartMeta.reference.image.url);
          } else if (chartMeta.value) {
            setChartImage(chartMeta.value);
          }
        }

        // Measurement image
        const measurementMeta = validMetafields.find((m) => m.key === "measurement");
        if (measurementMeta) {
          if (measurementMeta.reference?.image?.url) {
            setMeasurementImage(measurementMeta.reference.image.url);
          } else if (measurementMeta.value) {
            setMeasurementImage(measurementMeta.value);
          }
        }

        // Closeup Black Images
        const closeupBlackMeta = validMetafields.find((m) => m && m.key === "clouseup_black_images");
        if (closeupBlackMeta?.value) {
          try {
            const mediaIds = JSON.parse(closeupBlackMeta.value);
            const blackUrls = await fetchMediaUrls(mediaIds);
            setCloseupBlackImages(blackUrls);
          } catch (error) {
            console.error("Error parsing closeup black images:", error);
          }
        }

        // Closeup Beige Images
        const closeupBeigeMeta = validMetafields.find((m) => m && m.key === "clouseup_beige_images");
        if (closeupBeigeMeta?.value) {
          try {
            const mediaIds = JSON.parse(closeupBeigeMeta.value);
            const beigeUrls = await fetchMediaUrls(mediaIds);
            setCloseupBeigeImages(beigeUrls);
          } catch (error) {
            console.error("Error parsing closeup beige images:", error);
          }
        }

        // Main Black Images
        const mainBlackMeta = validMetafields.find((m) => m && m.key === "black_images");
        if (mainBlackMeta?.value) {
          try {
            const mediaIds = JSON.parse(mainBlackMeta.value);
            const blackMainUrls = await fetchMediaUrls(mediaIds);
            setMainBlackImages(blackMainUrls);
          } catch (error) {
            console.error("Error parsing main black images:", error);
          }
        }

        // Main Beige Images
        const mainBeigeMeta = validMetafields.find((m) => m && m.key === "beige_images");
        if (mainBeigeMeta?.value) {
          try {
            const mediaIds = JSON.parse(mainBeigeMeta.value);
            const beigeMainUrls = await fetchMediaUrls(mediaIds);
            setMainBeigeImages(beigeMainUrls);
          } catch (error) {
            console.error("Error parsing main beige images:", error);
          }
        }

      } catch (error) {
        console.error("Error fetching metafield images:", error);
      }
    };

    const fetchMediaUrls = async (mediaIds) => {
      if (!mediaIds || mediaIds.length === 0) return [];

      // Format media IDs for GraphQL query
      const formattedIds = mediaIds.map(id => `"${id}"`).join(',');
      
      const mediaQuery = `
        query {
          nodes(ids: [${formattedIds}]) {
            ... on MediaImage {
              id
              image {
                url
              }
            }
          }
        }
      `;

      try {
        const mediaRes = await fetch(GRAPHQL_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN,
          },
          body: JSON.stringify({ query: mediaQuery }),
        });

        const mediaResult = await mediaRes.json();
        return mediaResult.data?.nodes
          ?.map((node) => node?.image?.url)
          .filter(Boolean) || [];
      } catch (error) {
        console.error("Error fetching media URLs:", error);
        return [];
      }
    };

    if (productId) {
      fetchAllMetafieldImages();
    }
  }, [productId]);

  // Update current images when color changes or images are loaded
  useEffect(() => {
    if (selectedColor === 'Black') {
      setCurrentMainImages(mainBlackImages.length > 0 ? mainBlackImages : []);
      setCurrentCloseupImages(closeupBlackImages.length > 0 ? closeupBlackImages : []);
    } else {
      setCurrentMainImages(mainBeigeImages.length > 0 ? mainBeigeImages : []);
      setCurrentCloseupImages(closeupBeigeImages.length > 0 ? closeupBeigeImages : []);
    }
  }, [selectedColor, mainBlackImages, mainBeigeImages, closeupBlackImages, closeupBeigeImages]);

  // Fetch main product data (for variants, description, etc.)
  useEffect(() => {
    const fetchProduct = async () => {
      const globalId = `gid://shopify/Product/${productId}`;
      const query = `
        query {
          product(id: "${globalId}") {
            id
            title
            descriptionHtml
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  quantityAvailable
                  price {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      `;

      try {
        const res = await fetch(GRAPHQL_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN,
          },
          body: JSON.stringify({ query }),
        });

        const result = await res.json();
        const productData = result.data?.product;

        if (productData) {
          setProduct(productData);
          if (productData.variants.edges.length > 0) {
            setSelectedVariant(productData.variants.edges[0].node);
            const colorOption = productData.variants.edges[0].node.selectedOptions.find(
              opt => opt.name.toLowerCase() === 'color'
            );
            if (colorOption) {
              setSelectedColor(colorOption.value);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedSize(null);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    if (product) {
      const selectedVariant = product.variants.edges.find(({ node }) => {
        const colorOption = node.selectedOptions.find(opt => opt.name.toLowerCase() === 'color');
        const sizeOption = node.selectedOptions.find(opt => opt.name.toLowerCase() === 'size');
        return colorOption?.value === selectedColor && sizeOption?.value === size;
      });
      if (selectedVariant) {
        setSelectedVariant(selectedVariant.node);
      }
    }
  };

  if (!product) return <p className="text-center text-gray-300 mt-12">Loading...</p>;

  // Extract available sizes for the selected color with stock check
  const availableSizes = [];
  if (product) {
    const sizeSet = new Set();
    product.variants.edges.forEach(({ node }) => {
      const colorOption = node.selectedOptions.find(opt => opt.name.toLowerCase() === 'color');
      const sizeOption = node.selectedOptions.find(opt => opt.name.toLowerCase() === 'size');
      if (colorOption?.value === selectedColor && sizeOption && node.quantityAvailable > 0) {
        sizeSet.add(sizeOption.value);
      }
    });
    sizeSet.forEach(size => availableSizes.push({ size }));
  }

  const selectedProduct = {
    name: product.title,
    description: product.descriptionHtml,
    price: parseFloat(selectedVariant?.price.amount || '0') * usdToCurrencyRate,
    discountPrice: parseFloat(selectedVariant?.price.amount || '0') * usdToCurrencyRate * 0.9,
  };

  const convertPrice = (price, currency) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(price);
  };

  // Check if we have enough images for loop (minimum 3 for smooth loop)
  const hasEnoughImagesForLoop = currentMainImages.length >= 3;

  // Common Swiper settings
  const swiperSettings = {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    loop: hasEnoughImagesForLoop, // Only enable loop if we have enough images
    navigation: true,
    modules: [Pagination, Navigation],
  };

  return (
    <>
      <div className='w-10/12 mx-auto'>
        <div className="fixed inset-0 flex left-0 justify-center items-center pointer-events-none z-10">
          <img src={assets.s4} alt="Logo" className="w-70 mix-blend-multiply opacity-40" />
        </div>

        {/* Mobile View */}
        <div className='block lg:hidden'>
          <div className="product_cont flex flex-col justify-center mb-8">
            <div className="relative">
              {currentMainImages.length > 0 ? (
                <Swiper
                  {...swiperSettings}
                  navigation={{
                    nextEl: ".mobile-swiper-next",
                    prevEl: ".mobile-swiper-prev",
                  }}
                  className="productSwiper"
                >
                  {currentMainImages.map((url, index) => (
                    <SwiperSlide key={index}>
                      <div className="w-full h-[60vh]  flex items-center justify-center">
                        <img
                          src={url}
                          alt={`${selectedColor} Slide ${index}`}
                          className="max-h-[60vh] w-auto object-contain transition-transform duration-700"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="w-full h-[60vh] flex items-center justify-center ">
                  <p className="text-gray-500">Loading images...</p>
                </div>
              )}

              <div className="mobile-swiper-prev absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#666259] text-3xl z-20">
                ❮
              </div>
              <div className="mobile-swiper-next absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#666259] text-3xl z-20">
                ❯
              </div>
            </div>
          </div>
        </div>

        {/* Desktop View */}
        <div className='lg:grid grid-cols-1 lg:grid-cols-10 sm:ml-[30px] ml-0 md:gap-2'>
          {/* Left Panel */}
          <div className='lg:col-span-5 product_cont flex flex-col mt-0 justify-center'>
            <div className='w-full'>
              <h4 className='text-[8px] uppercase text-[#666259] font-medium'>{selectedProduct.name}</h4>

              <div className="price-display mt-[-10px]">
                {selectedProduct.discountPrice !== selectedProduct.price ? (
                  <span className="text-[8px] text-[#666259]">
                    {convertPrice(selectedProduct.price, currency)}
                  </span>
                ) : (
                  <span className="text-[8px] text-[#666259]">
                    {convertPrice(selectedProduct.price, currency)}
                  </span>
                )}
              </div>

              <h4 className='text-[8px] uppercase text-[#666259] font-medium'>INCLUSIVE OF TAXES.DUTIES ON ARRIVAL.</h4>

              {/* Colors */}
              <div className='flex gap-3 my-5'>
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full cursor-pointer border ${selectedColor === color.name ? 'ring-2 ring-[#605B55]' : ''}`}
                    style={{ backgroundColor: color.bg }}
                    onClick={() => handleColorChange(color.name)}
                  />
                ))}
              </div>

              {/* Size Selector */}
              <div className="flex flex-wrap gap-2 my-3">
                {product?.variants.edges
                  .filter(({ node }) => {
                    const colorOption = node.selectedOptions.find(opt => opt.name.toLowerCase() === 'color');
                    return colorOption?.value === selectedColor;
                  })
                  .map(({ node }) => {
                    const sizeOption = node.selectedOptions.find(opt => opt.name.toLowerCase() === 'size');
                    const isOutOfStock = node.quantityAvailable === 0;
                    return (
                      <span
                        key={node.id}
                        onClick={() => !isOutOfStock && handleSizeSelect(sizeOption.value)}
                        className={`w-6 h-6 items-center flex justify-center rounded text-[8px] text-[#030100] cursor-pointer
          ${selectedSize === sizeOption.value ? "bg-[#666259] text-[#030100]" : "bg-[#605B55] hover:bg-gray-200 hover:text-black"}
          ${isOutOfStock ? "opacity-40 cursor-not-allowed" : ""}`}
                      >
                        {sizeOption.value}
                      </span>
                    );
                  })}
              </div>

              {/* Add to Bag */}
              <div className="flex justify-center relative max-w-[280px] py-2 my-3 text-[8px] bg-[#666259] text-[#030100] cursor-pointer rounded-2xl shadow-amber-100 items-center">
                {selectedSize ? (
                  selectedVariant?.quantityAvailable > 0 ? (
                    <button
                      onClick={async () => {
                        try {
                          const cart = await addToCart(selectedVariant.id, 1);
                          if (cart) {
                            window.location.href = '/cart';
                          } else {
                            alert("Failed to add to cart.");
                          }
                        } catch (err) {
                          alert("Something went wrong.");
                          console.error(err);
                        }
                      }}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <button disabled className="opacity-60 cursor-not-allowed">
                      Out of Stock
                    </button>
                  )
                ) : (
                  <button>Please Select Size</button>
                )}
                <div className="absolute right-3">
                  <FaArrowRightLong  />
                </div>
              </div>

              {/* Product Details */}
              <div className='p-0 m-0'>
                <button onClick={() => setDetails(!details)} className="cursor-pointer text-[8px] text-[#666259] rounded-lg">
                  Product Details {details ? "-" : "+"}
                </button>
                {details && (
                  <div
                    className="my-1 text-[8px] text-[#666259] sm:max-w-[300px] w-full overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: selectedProduct.description }}
                  />
                )}
              </div>

              {/* Chart Details */}
              <div className='p-0 m-0 mt-[-10px]'>
                <button onClick={() => setChartDetails(!chartDetails)} className='cursor-pointer text-[8px] text-[#666259] rounded-lg'>
                  SIZE CHART {chartDetails ? "-" : "+"}
                </button>
              </div>
            </div>
          </div>

          {chartDetails && (
            <div className='fixed top-[50%] transform translate-y-[-50%] flex flex-row left-0 w-[100%] z-50 text-[10px] text-[#666259]'>
              <div className="z-50 left-4 bg-black/50 w-fit p-6 rounded-lg relative">
                <div className='sm:flex space-y-4 sm:space-y-0 gap-16 sm:items-center sm:justify-center'>
                  <div className='bg-[#7f7f7f50] sm:flex sm:items-center sm:justify-center w-[250px] z-50 sm:left-4 left-0 relative border'>
                    <button
                      className="absolute top-0 right-0 text-[10px] border w-6 h-6 font-bold bg-[#666259] text-[#030100] z-50"
                      onClick={() => setChartDetails(false)}
                    >
                      ✖
                    </button>
                    {chartImage ? (
                      <img
                        src={chartImage}
                        alt="Size Chart"
                        className='h-[180px] p-5 object-contain'
                      />
                    ) : (
                      <div className="h-[180px] w-full flex items-center justify-center text-[#666259]">
                        Size chart not available
                      </div>
                    )}
                  </div>

                  <div className="sm:max-w-4xl max-w-3xl border border-gray-300 shadow-md">
                    {measurementImage ? (
                      <img
                        src={measurementImage}
                        alt="Measurement Chart"
                        className='object-cover h-[132px] bg-[#605B55] w-full'
                      />
                    ) : (
                      <div className="h-[132px] w-full flex items-center justify-center text-[#666259] bg-[#605B55]">
                        Measurement chart not available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Media Panel - Desktop */}
          <div className="lg:col-span-5 product_cont hidden sm:flex flex-col justify-center order-2 lg:order-1">
            <div className="relative mt-[-45px] 2xl:mt-[-100px]">
              {currentMainImages.length > 0 ? (
                <Swiper
                  {...swiperSettings}
                  navigation={{
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                  }}
                  className="productSwiper"
                >
                  {currentMainImages.map((url, index) => (
                    <SwiperSlide key={index}>
                      <div className="w-full h-[80vh] flex items-center justify-center">
                        <img
                          src={url}
                          alt={`${selectedColor} Slide ${index}`}
                          className="max-h-[80vh] w-auto object-contain transition-transform duration-700"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="w-full h-[80vh] flex items-center justify-center ">
                  <p className="text-gray-500">Loading images...</p>
                </div>
              )}

              <div className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#666259] text-3xl z-20">
                ❮
              </div>
              <div className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#666259] text-3xl z-20">
                ❯
              </div>
            </div>
          </div>
        </div>

        {/* Closeup Images - Pass selected color and images as props */}
        <CloseupImages 
          closeupImages={currentCloseupImages} 
          selectedColor={selectedColor} 
        />
        
        <ProductMediaSection />
      </div>
    </>
  );
};

export default ProductDetail;