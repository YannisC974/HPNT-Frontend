import { Button, Img, TextNoto, Heading } from "../components";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const useGetVideoData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://hpn-ticket.happynation.global/data/video-section-data-json/'); 
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

export default function VideoAndDescriptionSection() {

  const { data, error: erroTicket, isLoading, isError } = useGetVideoData();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="mt-10 content-center self-stretch h-auto">
      <div className="mx-auto flex-1">
        <div className="relative z-[2] flex justify-center sm:bg-yellow-50 bg-[url(../../public/images/vector2.png)] bg-cover bg-no-repeat h-auto md:py-5 sm:py-4">
          {/* Video and description section */}
          <div className="container-xs flex flex-col mt-[3vw]">
            
            <div className="flex justify-center items-center sm:justify-center mt-[5vw] sm:mt-[0px] lg:w-full lg:p-5 md:w-full md:p-5">
              <div className="flex justify-center">
                <div className="flex flex-col items-center max-w-fit">
                  <div className="inline-block px-2 sm:px-1">
                    <Heading 
                      size="textlg" 
                      as="h2" 
                      className="relative z-[1]"
                    >
                      {data?.[0]?.title}
                    </Heading>
                  </div>
                  <div 
                    className="relative mt-[-1.7em] sm:mt-[-0.9em] md:mt-[-1.3em] md:h-[1.5em] h-[2.06em] sm:h-[1em] self-stretch sm:rounded-[2px] rounded-[3px] bg-yellow-800_01"
                  />
                  </div>
              </div>
            </div>

            <TextNoto as="p" className="text-center w-[60.833vw] md:w-[87%] mt-[2.083vw] mx-auto ">
              {data?.[0].description}
            </TextNoto>

            <div className="relative flex items-center mt-[5.208vw] sm:mt-[54px] justify-center mb-[12vw]">
              {!isPlaying ? (
                <>
                  <div 
                    className="relative flex bg-cover items-center justify-center sm:h-[235px] sm:w-[351px] md:h-[294px] md:w-[490px] h-[32.396vw] w-[53.854vw] bg-center rounded-[30px]"
                    style={{backgroundImage: `url(${data?.[0]?.thumbnail})`}}
                  />
                  <button 
                    onClick={handlePlay}
                    className="absolute flexitems-center justify-center rounded-full"
                  >
                  <svg 
                    width="100%" 
                    height="100%" 
                    viewBox="0 0 119 119" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[6.198vw] h-[6.198vw] sm:w-[40px] sm:h-[40px]"
                  >
                    <circle 
                      cx="59.7044" 
                      cy="59.1956" 
                      r="59.1966" 
                      fill="#F17430" 
                      fillOpacity="0.8"
                    />
                    <g filter="url(#filter0_d)">
                      <path 
                        d="M78.0762 57.129C78.4975 57.5291 78.4903 58.2029 78.0604 58.5939L52.2447 82.0749C51.5986 82.6626 50.5625 82.1977 50.5719 81.3244L51.0825 33.813C51.0919 32.9397 52.1377 32.4972 52.7711 33.0986L78.0762 57.129Z" 
                        fill="white"
                      />
                    </g>
                    <defs>
                      <filter 
                        id="filter0_d" 
                        x="46.5703" 
                        y="32.8218" 
                        width="35.8164" 
                        height="57.5154" 
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix 
                          in="SourceAlpha" 
                          type="matrix" 
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" 
                          result="hardAlpha"
                        />
                        <feOffset dy="4"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix 
                          type="matrix" 
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                      </filter>
                    </defs>
                  </svg>



                  </button>
                </>
              ) : (
                <iframe
                  className="relative flex justify-center items-center sm:h-[235px] sm:w-[351px] md:h-[294px] md:w-[490px] h-[32.396vw] w-[53.854vw]"
                  src={`${data?.[0]?.link}`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media" 
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
