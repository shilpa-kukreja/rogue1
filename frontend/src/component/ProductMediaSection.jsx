import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

const GRAPHQL_URL = "https://q3uepe-ic.myshopify.com/api/2024-04/graphql.json";
const ACCESS_TOKEN = "76df5b05e1b2db908234960f1757df67";

const ProductMediaSection = () => {
    const { productId } = useParams();
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [videos, setVideos] = useState([]);
    const videoRefs = useRef([]);

    // Function to render additional information from JSON
    const renderAdditionalInfo = (info) => {
        if (typeof info === 'string') {
            return <p>{info}</p>;
        }
        return info?.children?.map((child, index) => {
            if (child.type === 'paragraph') {
                return (
                    <p key={index} className={child.children?.[0]?.bold ? 'font-bold' : ''}>
                        {child.children?.map((text, i) => (
                            <span key={i}>{text.value}</span>
                        ))}
                    </p>
                );
            }
            return null;
        });
    };

    // Fetch product data (additional information and videos)
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const globalId = `gid://shopify/Product/${productId}`;
                const query = `
          query {
            product(id: "${globalId}") {
              metafields(identifiers: [
                {namespace: "custom", key: "additional_information"},
                {namespace: "custom", key: "videos"}
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
                        "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN,
                    },
                    body: JSON.stringify({ query }),
                });

                const result = await res.json();
                console.log('API Response:', result); // Log the API response to check for data

                const metafields = result.data?.product?.metafields || [];

                // Process additional information
                const infoMeta = metafields.find(m => m.key === "additional_information");
                if (infoMeta?.value) {
                    setAdditionalInfo(infoMeta.value);
                    console.log('Additional Info:', infoMeta.value); // Log additional info
                }

                // Process videos
                const videosMeta = metafields.find(m => m.key === "videos");
                if (videosMeta?.value) {
                    const videoId = videosMeta.value;  // Get the video ID
                    console.log('Video ID:', videoId);

                    // Query for video data using the video ID
                    const videoQuery = `
            query {
              node(id: "${videoId}") {
                ... on Video {
                  id
                  sources {
                    url
                    mimeType
                  }
                }
              }
            }
          `;

                    const videoRes = await fetch(GRAPHQL_URL, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN,
                        },
                        body: JSON.stringify({ query: videoQuery }),
                    });

                    const videoResult = await videoRes.json();
                    console.log('Video Data:', videoResult); // Log video data

                    // Process the video data
                    const videoData = videoResult.data?.node?.sources || [];
                    console.log('Processed Video Data:', videoData); // Log processed video data
                    setVideos(videoData); // Set the video in state
                }
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchProductData();
    }, [productId]);

    // Auto-play video logic using IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target;
                    if (entry.isIntersecting) {
                        video.play().catch((error) => console.error("Error playing video:", error));
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.5 }
        );

        videoRefs.current.forEach((video) => {
            if (video) observer.observe(video);
        });

        return () => {
            videoRefs.current.forEach((video) => {
                if (video) observer.unobserve(video);
            });
        };
    }, [videos]);

    return (
        <div className="w-full min-h-screen">
            {/* Additional Information Section */}
            <div className="w-full h-screen flex sm:flex-row flex-col">
                <div className="sm:w-1/2 w-full h-full flex items-center justify-center  p-4">
                    <div className="text-center max-w-2xl">

                        <div className="text-[10px] text-[#666259]   py-4 leading-relaxed">
                            {additionalInfo ? renderAdditionalInfo(JSON.parse(additionalInfo)) : "No additional information available."}
                        </div>
                    </div>
                </div>

                {/* Video Section */}
  <div className="sm:w-1/2 w-full h-full flex items-center justify-center relative overflow-hidden ">
  {videos.length > 0 ? (
    videos.map((video, idx) => (
      <video
        key={idx}
        ref={(el) => (videoRefs.current[idx] = el)}
        className="absolute top-1/2 left-1/2 w-auto h-full -translate-x-1/2 -translate-y-1/2 object-contain rounded-none"
        muted
        loop
        playsInline
        preload="auto"
        autoPlay
        style={{
          background: "black",
        }}
        onLoadedData={(e) => (e.target.style.opacity = 1)}
      >
        <source src={video.url} type={video.mimeType} />
        Your browser does not support the video tag.
      </video>
    ))
  ) : (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#666259] text-[#030100]">
      <h2 className="text-xs mb-2">Product Demonstration</h2>
      <p className="text-gray-300 text-xs">No video available</p>
    </div>
  )}
</div>




            </div>
        </div>
    );
};

export default ProductMediaSection;
