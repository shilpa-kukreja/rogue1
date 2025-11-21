import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const CloseupImages = ({ closeupImages, selectedColor }) => {
  if (!closeupImages || closeupImages.length === 0) {
    return (
      <div className="flex justify-center items-center text-[#666259] text-sm h-32">
        No closeup images available for {selectedColor} color.
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        // navigation={{
        //   nextEl: ".swiper-button-next-custom",
        //   prevEl: ".swiper-button-prev-custom",
        // }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 3 },
        }}
        loop
        className="w-full h-[100vh]"
      >
        {closeupImages.map((url, index) => (
          <SwiperSlide key={index} className="h-[100vh]">
            <div className="w-full h-full overflow-hidden relative flex items-center justify-center">
              <img
                src={url}
                alt={`${selectedColor} Closeup ${index + 1}`}
                className="w-auto h-full max-w-none object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>
        {`
          .swiper-pagination-bullet {
            background: white !important;
          }
          .swiper-button-next-custom,
          .swiper-button-prev-custom {
            background: none;
            border-radius: 50%;
            width: 45px;
            height: 45px;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: background 0.3s ease;
          }
          .swiper-button-next-custom:hover,
          .swiper-button-prev-custom:hover {
            background: rgba(0,0,0,0.6);
          }
        `}
      </style>
    </div>
  );
};

export default CloseupImages;