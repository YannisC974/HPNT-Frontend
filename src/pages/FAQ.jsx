import React from "react";
import { Heading, Text, Slider, Button, Img } from '../components'

import {
    AccordionItemPanel,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemState,
    Accordion,
    AccordionItem,
} from "react-accessible-accordion"

const faqData = [
  {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
      question: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat?",
      answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
      question: "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio?",
      answer: "Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar."
  }
  ];
  

export default function FAQ() {
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
                  <div className="ml-[34.7px] sm:ml-[19px]">{item.answer}</div>
                </AccordionItemPanel>
                <div className="h-[3px] w-full rotate-[0deg] bg-black-900_14" />
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    );
  }