import React, { useContext, useState, useCallback } from 'react';
import Marquee from "react-fast-marquee";
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';

const SliderProduct = () => {
    const [hoveredImg, setHoveredImg] = useState(false);
    const { products } = useContext(ShopContext);

    const handleMouseEnter = useCallback(() => {
        console.log("Hovered: Showing rotated images");
        setHoveredImg(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        console.log("Unhovered: Showing default images");
        setHoveredImg(false);
    }, []);

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Marquee className='py-6 mt-6' speed={80} pauseOnHover={true} gradient={false}>
                {products?.length > 0 ? (
                    products.map((item) => (
                        <div key={item.id || item._id}>
                             <Link to={`/product/${item._id}`}>
                            <img
                                src={
                                    hoveredImg
                                        ? item.variants[0].images?.[3] || "https://via.placeholder.com/150"
                                        : item.variants[0].images?.[0] || "https://via.placeholder.com/150"
                                }
                                alt="Product"
                                className='object-cover w-[220px]'
                            />
                             </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No products available</p>
                )}
            </Marquee>
        </div>
    );
};

export default SliderProduct;
