import React, { useState } from "react";
import "../styles/ImageSlider.css"; 

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-full max-w-md">
        <div className="absolute top-1/2 transform -translate-y-1/2 left-0 z-10">
          <button
            className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-600"
            onClick={prevSlide}
          >
            &#9664;
          </button>
        </div>

        <div className="w-full h-auto overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute transition-opacity duration-500 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="w-full h-auto">
                <div className="group perspective">
                  <div className="relative preserve-3d group-hover:rotate-y-180">
                    <img
                      src={image.front}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-auto backface-hidden"
                    />
                    <div className="absolute inset-0 w-full h-full bg-gray-800 text-white flex items-center justify-center rotate-y-180 backface-hidden">
                      <img
                        src={image.back}
                        alt={`Back of Slide ${index + 1}`}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute top-1/2 transform -translate-y-1/2 right-0 z-10">
          <button
            className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-600"
            onClick={nextSlide}
          >
            &#9654;
          </button>
        </div>
      </div>
    </div>
  );
};

export {ImageSlider};
