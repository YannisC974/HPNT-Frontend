import React, { useEffect, useState, useRef } from "react";
import DisplayTicket from "../components/DisplayTicket";
import { Heading, Button, HeadingShadow, TextNoto, TextShadow } from "../components";
import axios from "axios";

const useGetTicketData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/data/ticket-data-json/'); // Remplacez par votre URL API
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

export default function Ticket() {
  const [error, setError] = useState(null);
  const imageRef = useRef(null);

  const { data, error: erroTicket, isLoading, isError } = useGetTicketData();

  const handleDownload = async () => {
    console.log("Button clicked");
    console.log(localStorage);
    try {
      const ticketId = localStorage.getItem('ticketId');   
      const response = await axios.get("http://127.0.0.1:8000/api/download-ticket/", {
        params: {
          ticketNumber: ticketId,
        },
        withCredentials: true 
      });
      console.log(response.data);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ticket_${ticketId}.png`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
        setError(error.message);
    }
  };

    return (
        <div className="self-stretch">
        <div className="relative z-2 flex flex-col justify-center bg-[url('../../public/images/vector1.png')] bg-cover bg-cottom bg-no-repeat">
            <div className="container mt-[9.896vw] sm:mt-[98px] mb-[60px]">
              <div>
                <div className="flex flex-col">

                  <div className="flex flex-col items-center">

                    <div className="flex justify-center">
                      <div className="flex flex-col items-center max-w-fit">
                        <div className="inline-block px-4 sm:px-2">
                          <Heading 
                            size="textlg" 
                            as="h2" 
                            className="relative z-[1]"
                          >
                            {data?.[0]?.title}
                          </Heading>
                        </div>
                        <div className="relative mt-[-1.7em] sm:mt-[-0.9em] md:mt-[-1.3em] h-[2.06em] sm:h-[1em] md:h-[1.5em] self-stretch sm:rounded-[2px] rounded-[3px] bg-yellow-800_01"/>
                      </div>
                    
                    </div>
                    <TextNoto as="p" className="w-[60.833vw] sm:w-[315px] mt-[1.042vw] text-center">
                      {data?.[0]?.description}
                    </TextNoto>

                    <DisplayTicket />

                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
    );
}