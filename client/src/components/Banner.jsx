import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const data = [
    {
      image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7a3",
      title: "Summer Collection",
      subtitle: "Discover our latest styles",
      cta: "Shop Now",
    },
    {
      image: "https://images.unsplash.com/photo-1521566652839-697aa473b3f0",
      title: "New Arrivals",
      subtitle: "Fresh looks for the season",
      cta: "Explore",
    },
    {
      image: "https://images.unsplash.com/photo-1481437156560-3205aee19f74",
      title: "Limited Edition",
      subtitle: "Exclusive pieces, limited time",
      cta: "Get It Now",
    },
    {
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04",
      title: "Clearance Sale",
      subtitle: "Up to 70% off selected items",
      cta: "Shop Sale",
    },
  ];

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? data.length - 1 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === data.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <div className="relative w-full h-[650px] overflow-hidden">
      {/* Slide container */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {data.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            {/* Slide image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay with text */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="text-xl mb-4">{slide.subtitle}</p>
                <Link
                  to="/#shop"
                  className="bg-white text-black py-2 px-4 rounded-md"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
      >
        <ChevronLeft className="w-6 h-6 text-black" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
      >
        <ChevronRight className="w-6 h-6 text-black" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
