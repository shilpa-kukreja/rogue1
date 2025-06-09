
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams, Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import { assets } from '../assets/assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

const ProductDetail = () => {
    // All hooks at the top level - no conditional calls
    const { products, addToCart, currency } = useContext(ShopContext);
    const { productId } = useParams();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [videoSetIndex, setVideoSetIndex] = useState(0);
    const [details, setDetails] = useState(false);
    const [chartDetails, setChartDetails] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [price, setPrice] = useState(null);
    const [discountPrice, setDiscountPrice] = useState(null);
    const [conversionRates, setConversionRates] = useState({});
    const sliderRef = useRef(null);
    const [firstIndex, setFirstIndex] = useState(0);
    const [secondIndex, setSecondIndex] = useState(0);
    const [firstdownimage, setfirstdownimage] = useState(1);
    const [seconddownimage, setseconddownimage] = useState(2);


    // Fetch conversion rates
    useEffect(() => {
        fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
            .then(res => res.json())
            .then(data => {
                if (data && data.usd) {
                    setConversionRates(data.usd);
                }
            })
            .catch(err => console.error("Error fetching currency rates:", err));
    }, []);

    useEffect(() => {
        if (products && products.length > 0 && productId) {
            const product = products.find((item) => String(item._id) === String(productId));
            setSelectedProduct(product || null);

            if (product?.variants?.[0]?.sizesInfo?.[0]) {
                const firstSize = product.variants[0].sizesInfo[0];
                setPrice(firstSize.actualPrice);
                setDiscountPrice(firstSize.discountPrice);
            }
        }
    }, [products, productId]);

    // Move all derived state calculations after hooks
    const variant = selectedProduct?.variants?.[0] || {};
    const firstVariantIndex = videoSetIndex * 2;
    const secondVariantIndex = videoSetIndex * 2 + 1;

    const firstImages = selectedProduct?.variants[firstVariantIndex]?.animationimages || [];
    const secondImages = selectedProduct?.variants[secondVariantIndex]?.animationimages || [];

    // Image rotation effect - now safe because we have fallback empty arrays
    useEffect(() => {
        if (firstImages.length === 0 && secondImages.length === 0) return;

        const interval = setInterval(() => {
            if (firstImages.length > 0) {
                setFirstIndex(prev => (prev + 1) % firstImages.length);
            }
            if (secondImages.length > 0) {
                setSecondIndex(prev => (prev + 1) % secondImages.length);
            }
        }, 900);

        return () => clearInterval(interval);
    }, [firstImages.length, secondImages.length]);

    const convertPrice = (priceInUSD, selectedCurrency) => {
        const rate = conversionRates[selectedCurrency.toLowerCase()] || 1;
        return (priceInUSD * rate).toFixed(2);
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        const selectedSizeInfo = selectedProduct?.variants?.[0]?.sizesInfo?.find((s) => s.size === size);
        if (selectedSizeInfo) {
            setPrice(selectedSizeInfo.actualPrice);
            setDiscountPrice(selectedSizeInfo.discountPrice);
        }
    };

    if (!selectedProduct) {
        return <p className='p-4'>Product not found. Please select a valid product.</p>;
    }

    // Mobile media setup
    const mobileVideos = [];
    const mobileImages = [];
    const img1 = variant.images?.[1];
    const img2 = variant.images?.[2];

    if (img1) mobileImages.push({ type: 'image', src: img1 });
    if (img2) mobileImages.push({ type: 'image', src: img2 });

    [firstVariantIndex, secondVariantIndex].forEach(index => {
        const current = selectedProduct.variants[index];
        if (current?.videoUrl) {
            mobileVideos.push({ type: 'video', src: current.videoUrl });
        }
    });

    const mobileMediaItems = [...mobileVideos, ...mobileImages];

    const hangechangecolor = (index) => {

        setVideoSetIndex(index / 2);
        if (firstdownimage == 1) {
            setfirstdownimage(2);
            if (variant.images.length == 6) {
                setseconddownimage(4);
                setfirstdownimage(3);
            }
        } else {

            setfirstdownimage(1);
            if (variant.images.length == 6) {
                setseconddownimage(2);
            }
        }

    }

    return (
        <>
            <div className='w-10/12 m-auto'>
                <div className="fixed inset-0 flex left-0 justify-center items-center pointer-events-none z-10">
                    <img src={assets.s4} alt="Logo" className="w-70 mix-blend-multiply opacity-40" />
                </div>


               
                   {/* Mobile View with Swiper */}
<div className="lg:hidden block mb-30">
    <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
            clickable: true,
        }}
        navigation={false}
        modules={[Pagination, Navigation]}
        className="mySwiper"
    >
        {/* Animation images slides */}
        <SwiperSlide>
            <div className='flex'>
                {firstImages.length > 0 && (
                    <div className="w-[50%]">
                        <img
                            src={`https://rogue0707.com${firstImages[firstIndex]}`}
                            alt="First Variant Animation"
                            className="w-full max-h-[400px] object-contain"
                        />
                    </div>
                )}
                {secondImages.length > 0 && (
                    <div className="w-[50%]">
                        <img
                            src={`https://rogue0707.com${secondImages[secondIndex]}`}
                            alt="Second Variant Animation"
                            className="w-full max-h-[400px] object-contain"
                        />
                    </div>
                )}
            </div>
        </SwiperSlide>

        {/* Static images - matching desktop view */}
        {variant.images?.[1] && (
            <SwiperSlide>
                <div className="w-full">
                    <img
                        src={`https://rogue0707.com${variant.images[firstdownimage]}`}
                        alt={selectedProduct.name}
                        className="w-full max-h-[400px] object-contain"
                    />
                </div>
            </SwiperSlide>
        )}
        
        {variant.images?.length === 6 && variant.images?.[2] && (
            <SwiperSlide>
                <div className="w-full">
                    <img
                         src={`https://rogue0707.com${variant.images[seconddownimage]}`}
                        alt={selectedProduct.name}
                        className="w-full max-h-[400px] object-contain"
                    />
                </div>
            </SwiperSlide>
        )}
        
       
        
        {/* {variant.images?.length === 6 && variant.images[4] && (
            <SwiperSlide>
                <div className="w-full">
                    <img
                        src={`https://rogue0707.com${variant.images[4]}`}
                        alt={selectedProduct.name}
                        className="w-full max-h-[400px] object-contain"
                    />
                </div>
            </SwiperSlide>
        )}
        
        {variant.images?.length === 6 && variant.images[5] && (
            <SwiperSlide>
                <div className="w-full">
                    <img
                        src={`https://rogue0707.com${variant.images[5]}`}
                        alt={selectedProduct.name}
                        className="w-full max-h-[400px] object-contain"
                    />
                </div>
            </SwiperSlide>
        )} */}
    </Swiper>
</div>
                
                {/* Desktop View */}
                <div className='grid grid-cols-1 lg:grid-cols-10 sm:ml-[30px] ml-0 md:gap-2'>
                    {/* Left Panel */}
                    <div className='lg:col-span-3  product_cont'>
                        <div className='sticky lg:fixed w-full top-[50%] transform translate-y-[-50%]'>
                            <h4 className='text-[8px] uppercase text-[#A9ABAE] font-medium'>{selectedProduct.name}</h4>

                            <div className="price-display mt-[-10px]">
                                {discountPrice !== price ? (
                                    <span className="text-[8px] text-[#A9ABAE]">
                                        {convertPrice(discountPrice, currency)} {currency}
                                    </span>
                                ) : (
                                    <span className="text-[8px] text-[#A9ABAE]">
                                        ${price?.toFixed(2)} USD
                                    </span>
                                )}
                            </div>

                            {/* Colors */}
                            <div className='flex gap-3 my-5'>
                                {selectedProduct.variants.map((v, index) =>
                                    index % 2 === 0 ? (
                                        <div
                                            key={index}
                                            className={`w-4 h-4 rounded-full cursor-pointer border ${videoSetIndex === index / 2 ? 'ring-2 ring-[#605B55]' : ''}`}
                                            style={{ backgroundColor: v.color }}
                                            onClick={() => hangechangecolor(index)}
                                        />
                                    ) : null
                                )}
                            </div>

                            {/* Size Selector */}
                            <div className="flex space-x-4 my-3 space-y-3">
                                {variant.sizesInfo.map((size, index) => (
                                    <span
                                        key={index}
                                        onClick={() => handleSizeSelect(size.size)}
                                        className={`w-6 h-6 items-center flex justify-center rounded text-[8px] text-[#d2d3d4] cursor-pointer ${selectedSize === size.size ? "bg-gray-200 text-black" : "bg-[#605B55] hover:bg-gray-200 hover:text-black"
                                            }`}
                                    >
                                        {size.size}
                                    </span>
                                ))}
                            </div>

                            {/* Add to Bag */}
                            <div className="flex justify-center relative max-w-[280px] py-2 my-3 text-[8px] text-[#D2D3D5] cursor-pointer bg-[#605B55] rounded-2xl shadow-amber-100 items-center">
                                {selectedSize ? (
                                    <Link to="/cart" onClick={() => addToCart(selectedProduct, selectedSize)}>
                                        <button>Add to bag</button>
                                    </Link>
                                ) : (
                                    <button>Please Select Size</button>
                                )}
                                <div className="absolute right-3">
                                    <FaArrowRightLong />
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className='p-0 m-0'>
                                <button onClick={() => setDetails(!details)} className="cursor-pointer text-[8px] text-[#A9ABAE] rounded-lg">
                                    Product Details {details ? "-" : "+"}
                                </button>
                                {details && (
                                    <div
                                        className="my-1 text-[8px] text-[#A9ABAE] sm:max-w-[300px] w-full overflow-y-auto"
                                        dangerouslySetInnerHTML={{ __html: selectedProduct.description }}
                                    />
                                )}
                            </div>


                            {/* Chart Details */}
                            <div className='p-0 m-0 mt-[-10px]'>
                                <button onClick={() => setChartDetails(!chartDetails)} className='cursor-pointer text-[8px] text-[#A9ABAE] rounded-lg'>
                                    Chart Details {chartDetails ? "-" : "+"}
                                </button>

                            </div>
                        </div>
                    </div>

                    {chartDetails && (
                        <div className='fixed top-[50%] transform translate-y-[-50%] flex flex-row  left-0 w-[100%]  z-50 text-[10px] text-[#d2d2d4]'>
                            <div className="z-50 left-4 bg-black/50 w-fit p-6 rounded-lg   relative">
                                <div className='sm:flex space-y-4 sm:space-y-0 gap-16 sm:items-center sm:justify-center'>
                                    <div className='bg-[#7f7f7f50] w-[250px] z-50 left-4 relative border'>
                                        <button className="absolute top-0 right-0 text-[10px] border w-6 h-6 font-bold bg-white text-black z-50"
                                            onClick={() => setChartDetails(false)}>
                                            ✖
                                        </button>
                                        {
                                            variant.images.length === 6 ? (
                                                <img
                                                    src={`https://rogue0707.com${variant.images[5]}`}
                                                    alt={selectedProduct.name}
                                                    className='object-cover h-[132px] w-full'
                                                />
                                            ) : (
                                                <img
                                                    src={`https://rogue0707.com${variant.images[3]}`}
                                                    alt={selectedProduct.name}
                                                    className='object-cover h-[132px] w-full'
                                                />
                                            )
                                        }

                                    </div>
                                    <div className="sm:max-w-4xl max-w-3xl border border-gray-300 shadow-md">
                                        <table className="w-full text-center">
                                            <thead>
                                                <tr className="text-[8px]">
                                                    <th className="py-1">Ref</th>
                                                    <th className="py-1">Measurement (cm)</th>
                                                    {variant.sizesInfo.map((s) => (
                                                        <th key={s.size} className="py-1">{s.size}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {variant.sizeChart.map((item, index) => (
                                                    <tr key={index} className="text-[8px]">
                                                        <td className="px-4 py-1">{item.ref}</td>
                                                        <td className="px-4 py-1">{item.label}</td>
                                                        {variant.sizesInfo.map((s) => (
                                                            <td key={s.size} className="px-4 py-1">{item[s.size]}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Right Media Panel - Desktop */}
                    <div className='lg:col-span-7 relative lg:block hidden'>
                        <div className='relative flex items-center justify-center transition-all duration-500 ease-in-out'>
                            <div className="flex md:gap-10 w-full mt-[-45px]    2xl:mt-[-100px] justify-end items-center overflow-hidden h-auto ">
                                <div className="animation-image-container">
                                    {firstImages.length > 0 && (
                                        <img
                                            src={`https://rogue0707.com${firstImages[firstIndex]}`}
                                            className="h-[90vh]"
                                            alt="First Variant Animation"
                                        />
                                    )}
                                </div>
                                <div className="animation-image-container">
                                    {secondImages.length > 0 && (
                                        <img
                                            src={`https://rogue0707.com${secondImages[secondIndex]}`}
                                            className="h-[90vh]"
                                            alt="Second Variant Animation"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='mt-[15vh]'>

                            <img
                                src={`https://rogue0707.com${variant.images[firstdownimage]}`}
                                alt={selectedProduct.name}
                                className='object-cover sm:max-w-[600px] mb-8 float-right w-full'
                            />



                            {
                                variant.images.length === 6 && (
                                    <img
                                        src={`https://rogue0707.com${variant.images[seconddownimage]}`}
                                        alt={selectedProduct.name}
                                        className='object-cover sm:max-w-[600px] mb-3 float-right w-full'
                                    />
                                )
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;