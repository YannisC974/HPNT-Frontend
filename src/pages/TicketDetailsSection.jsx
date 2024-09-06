import React, { useEffect, useState, useRef } from "react";
import { Heading, TextNoto } from "../components";

const useGetTicketData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/data/about-ticket-data-json/'); 
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

export default function TicketDetailsSection() {

  const { data, error: erroTicket, isLoading, isError } = useGetTicketData();
  return (
    <div className="self-stretch ml-[6.667vw] md:ml-0 mt-[3vw]">
      <div className="flex justify-start md:justify-center md:w-full">
          <div className="flex justify-center">
            <div className="flex flex-col items-center max-w-fit">
              <div className="inline-block px-2 sm:px-1">
                <Heading 
                  size="textlg" 
                  as="h2" 
                  className="relative z-[1]"
                >
                  About the tickets
                </Heading>
              </div>
              <div 
                className="relative mt-[-1.7em] sm:mt-[-0.9em] md:mt-[-1.3em] h-[2.06em] md:h-[1.5em] sm:h-[1em] self-stretch sm:rounded-[2px] rounded-[3px] bg-yellow-800_01"
              />
              </div>
          </div>
        </div>
      <div className="flex w-[86.6%] md:ml-[6.6vw] justify-start md:justify-center mt-[2.448vw]">
        {/* ticket details section */}
        <div className="relative z-[5] flex flex-col gap-6">
          <div className="mr-[54px] flex w-[92%] flex-col items-start gap-2.5 lg:w-full md:mr-0 md:w-full">
            <Heading as="h2" size="headingC">
              Background name
            </Heading>
            <Heading size="headingxs" as="h3" className="!font-notosans">
              Artist: Name
            </Heading>
            <TextNoto as="p" className="w-full leading-8">
              {data?.[0]?.description1}
            </TextNoto>
          </div>
          <div className="mr-[76px] flex w-[92%] flex-col items-start gap-3 lg:w-full md:mr-0 md:w-full">
            <Heading as="h4" className="md:text-[30px] sm:text-[28px]">
              Character name
            </Heading>
            <Heading size="headingxs" as="h5" className="!font-notosans">
              Artist: Name
            </Heading>
            <TextNoto as="p" className="w-full leading-8">
               {data?.[0]?.description2}
            </TextNoto>
          </div>
        </div>
      </div>
    </div>
  );
}
