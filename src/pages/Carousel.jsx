import React, { useState, useRef, useEffect } from 'react';
import { Slider } from '../components/Slider/Slider';
import { Heading, TextNoto } from '../components'
import AliceCarousel from "react-alice-carousel";
import '../styles/index.css'
import leftArrow from '../assets/left-arrow.png' 
import rightArrow from '../assets/right-arrow.png'; 

const useGetOnboardingData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/data/onboarding-data-json/'); 
        setData(response.data);
        setIsError(false);
      } catch (error) {
        setError(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, isLoading, isError };
};

const useGetImageOnboardingData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/data/image-onboarding-json/'); 
        setData(response.data);
        setIsError(false);
      } catch (error) {
        setError(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, isLoading, isError };
};

const Carousel = () => {
  const [sliderState, setSliderState] = useState(0);
  const { data, error, isLoading, isError } = useGetOnboardingData();
  const { data: dataImg, error: errorImg, isLoading: isLImg, isError: isErrImg } = useGetImageOnboardingData();
  const sliderRef = useRef(null);

  const images = [
    '../../public/images/image95.png',
    '../../public/images/image95.png',
    '../../public/images/image95.png',
    '../../public/images/image95.png',
    '../../public/images/image95.png',
  ];

  const items = images.map((image, index) => (
    <div className="item-wrapper w-full h-full flex items-center justify-center" key={index}>
      <img src={image} alt={`Slide ${index}`} className="object-cover w-full h-full" />
    </div>
  ));
  

  const responsive = {
    0: { items: 1 },
    551: { items: 1 },
    1051: { items: 1 },
    1441: { items: 1 }
  };

  return (
    <div className="flex md:flex-col lg:flex-row w-[87%] pt-[6vw]">
      <div className="flex flex-col md:justify-center lg:w-[40%] md:w-full pt-[3.854vw]">
          <div className="inline-block md:z-[6] z-[6] md:h-12 sm:h-4 sm:px-2 md:text-center">
            <Heading size="textlg" as="h2" className="md:text-center w-[435px] md:w-full">
              Onboarding to the wallet
            </Heading>
            <div className="relative md:z-[-1] z-[-1] mt-[-5.3em] mb-[3.3em] md:mt-[-1.3em] sm:mt-[-0.9em] h-[2em] sm:w-[19em] md:w-[27em] sm:h-[1em] md:h-[1.5em] w-[25em] self-stretch sm:rounded-[2px] rounded-[3px] md:mx-auto bg-yellow-800_01"/>  
            <div className="relative md:hidden z-[-1] mt-[-1.7em] md:mt-[-1.3em] sm:mt-[-0.9em] h-[2em] w-[9em] sm:h-[1em] md:h-[1.5em] self-stretch sm:rounded-[2px] rounded-[3px] bg-yellow-800_01"/>
          </div>
          <TextNoto as="p" className="md:text-center md:w-full w-[29.375vw] pt-[2.083vw] sm:mt-[20px]">
            {data?.[0].description}
          </TextNoto>
        </div>
        <div className='w-full lg:w-[60%] md:w-full md:mt-[9vw] sm:mt-[40px]'>
          <div className="carousel-container md:w-auto w-[49.01vw] mx-auto">
              <AliceCarousel
              items={items}
              responsive={responsive}
              autoPlayInterval={3000}
              autoPlayDirection="ltr"
              autoPlay={false}
              fadeOutAnimation={true}
              stagePadding={0}
              mouseTrackingEnabled={true}
              disableButtonsControls={false}
              disableDotsControls={false}
              renderPrevButton={() => {
                return (
                  <button className="absolute left-4 top-[45%] transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full flex items-center justify-center">
                    <img src={leftArrow} alt="Previous" className="w-10 h-10 sm:h-[21px] sm:w-[21px]" />
                  </button>
                );
              }}
              renderNextButton={() => {
                return (
                  <button className="absolute right-4 top-[45%] transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full flex items-center justify-center">
                    <img src={rightArrow} alt="Next" className="w-10 h-10 sm:h-[21px] sm:w-[21px]" />
                  </button>
                );
              }}
              />
          </div>
      </div>
    </div>
      
  );
};

export default Carousel;