import React, { useEffect, useState, useRef } from "react";
import { Heading, Text, Slider, Button, Img } from '../components'
import axios from "axios";

import {
    AccordionItemPanel,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemState,
    Accordion,
    AccordionItem,
} from "react-accessible-accordion"


const useGetFaqData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://hpn-ticket.happynation.global/data/faq-json/'); 
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
  

export default function FAQ() {
    const { data, error, isLoading, isError } = useGetFaqData();

    const faqData = data ? data.map(item => ({
      question: item.question,
      answer: item.answer,
      video_link: item.video_link || null, 
      thumbnail: item.thumbnail ? item.thumbnail : null, 
      image: item.image ? item.image : null 
    })) : [];

    return (
      <div className="mt-[8.125vw] flex h-[946px] items-start justify-center self-stretch bg-[url('../public/images/vector3.png')] bg-cover bg-no-repeat sm:px-6 px-14 sm:py-6 py-[132px] lg:h-auto lg:py-8 md:h-auto">
        <div className="mb-[298px] flex w-[82%] flex-col items-center gap-[54px] lg:w-full md:w-full sm:gap-[27px]">
          <div className="container-xs flex flex-col items-center px-14 lg:p-5 md:px-5 sm:px-4">
            <div className="flex justify-center">
              <div className="flex flex-col items-center max-w-fit">
                <div className="inline-block px-4 sm:px-2">
                  <Heading size="textlg" as="h2" className="relative z-[1]">
                    FAQs
                  </Heading>
                </div>
                <div className="relative mt-[-1.7em] md:mt-[-1.3em] sm:mt-[-0.9em] h-[2.06em] sm:h-[1em] md:h-[1.5em] self-stretch sm:rounded-[2px] rounded-[3px] bg-yellow-800_01"/>
              </div>
            </div>
          </div>
          <Accordion allowMultipleExpanded={false} allowZeroExpanded={true} className="flex flex-col gap-10 self-stretch">
            {faqData.map((item, i) => (
              <AccordionItem uuid={i} key={`FAQ List${i}`}>
                <AccordionItemHeading className="w-full">
                  <AccordionItemButton>
                    <AccordionItemState>
                      {(props) => (
                        <>
                          <div className="flex flex-1 items-start md:flex-row">
                            <Button shape="square" className="mt-1 w-[27.7px] sm:w-[12px] md:w-[20px] min-w-[27.7px] md:min-w-[20px] sm:min-w-[12px] hover:filter hover:text-yellow-800">
                              <img src="../images/faq.png" alt="FAQ icon" className="hover:filter hover:brightness-150"/>
                            </Button>
                            <Heading size="texts" as="h3" className="ml-7 self-center hover:text-yellow-800">
                              {item.question}
                            </Heading>
                          </div>
                        </>
                      )}
                    </AccordionItemState>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {/* <div className="ml-[34.7px] sm:ml-[19px]">{item.answer}</div> */}
                  <div className="ml-[34.7px] sm:ml-[19px]">
                  {item.answer}
                  {item.video_link && (
                    <div className="mt-4">
                      <video controls className="w-full">
                        <source src={item.video_link} />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                  {item.thumbnail && (
                    <div className="mt-4">
                      <img src={item.thumbnail} alt="Thumbnail" className="w-full max-w-[400px]"/>
                    </div>
                  )}
                  {item.image && (
                    <div className="mt-4">
                      <img src={item.image} alt="Image" className="w-full max-w-[400px]"/>
                    </div>
                  )}
                </div>
                </AccordionItemPanel>
                <div className="h-[3px] w-full rotate-[0deg] bg-black-900_14" />
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    );
  }