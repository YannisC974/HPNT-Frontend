import React, { useEffect, useState, useRef } from "react";
import '../styles/DisplayTicket.css';
import { Heading, Button, HeadingShadow, TextNoto, TextShadow } from "../components";
import axios from "axios";
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import leftArrow from '../assets/left-arrow.png' 
import rightArrow from '../assets/right-arrow.png'; 
import { useWeb3ModalAccount } from '@web3modal/ethers/react';

const useGetTicketData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://hpn-ticket.happynation.global/data/ticket-data-json/'); 
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

const useGetAboutTicketData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://hpn-ticket.happynation.global/data/about-ticket-data-json/'); 
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [ticketCount, setTicketCount] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [areClaimed, setAreClaimed] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [securityCode, setSecurityCode] = useState('');
  const [securityCodeSent, setSecurityCodeSent] = useState(false)
  const navigate = useNavigate();
  const [ticketIds, setTicketIds] = useState([]);
  const currentTicketId = ticketIds[activeIndex];
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const [successClaim, setSuccessClaim] = useState(false);

  const sliderRef = useRef(null);

  const goNext = () => {
    sliderRef.current.slickNext();
  };

  useEffect(() => {
    const verifyTokens = async () => {
      try {
        if (isConnected && address) {
          const res = await axios.post('https://hpn-ticket.happynation.global/api/verify-and-authenticate-wallet/', { address });
          if (res) {
            localStorage.setItem('ticketIds', JSON.stringify(res.data.ticketIds));
            console.log(localStorage);
            navigate('/my-ticket');
          } else {
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Error');
      }
    };

    const handleLogout = async () => {
      try {
        await axios.post('https://hpn-ticket.happynation.global/api/logout-wallet/');
        localStorage.removeItem('ticketIds');
        console.log('Logout successful and ticketIds removed.');
        const ticketId = localStorage.getItem('ticketId');
        if (!ticketId)
          navigate('/login'); 
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    if (isConnected && address) {
      verifyTokens();
    } else if (!isConnected) {
      handleLogout();
    }
  }, [isConnected, address, navigate]);


  useEffect(() => {

  })

  const goPrev = () => {
    sliderRef.current.slickPrev();
  };

  const { data, error: erroTicket, isLoading, isError } = useGetTicketData();
  const { data: dataAbout, error: errorTicket, isLoading: isLoadingAbout, isError: isErrorAbout } = useGetAboutTicketData();

  const handleDownload = async (ticketId) => {
    try {
      const ticketIds = JSON.parse(localStorage.getItem('ticketIds')) || [];
      const ticketId = JSON.parse(localStorage.getItem('ticketId')) || null;
  
      if (ticketId != null){
        ticketIds.push(ticketId);
      }
      
      const actualTicketId = ticketIds[activeIndex];
      console.log("button");
      console.log(actualTicketId);

      const response = await axios.get("https://hpn-ticket.happynation.global/api/download-ticket/", {
        params: {
          ticketNumber: actualTicketId,
        },
        withCredentials: true, 
      });
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

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const ticketIds = JSON.parse(localStorage.getItem('ticketIds')) || [];
        const ticketId = JSON.parse(localStorage.getItem('ticketId')) || null;
        
        if (ticketId != null){
          ticketIds.push(ticketId);
        }
        setTicketCount(ticketIds.length);

        const responses = await Promise.all(
          ticketIds.map((ticketId) => {
            return axios.get("https://hpn-ticket.happynation.global/api/display-ticket/", {
              params: { ticketNumber: ticketId },
              withCredentials: true,
            });
          })
        );
        const ticketsData = responses.map(response => response.data);
        setTickets(ticketsData);
      } catch (error) {
        setError(error.response?.data?.error || error.message);
      }
    };

    fetchTickets();
  }, []);

  const flipperStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  };

  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
        }
      }
    ],
    beforeChange: (current, next) => setActiveIndex(next),
  };

  useEffect(() => {
    const checkIfClaimed = async () => {
      try {
        const ticketIds = JSON.parse(localStorage.getItem('ticketIds')) || [];
        const ticketId = JSON.parse(localStorage.getItem('ticketId')) || null;
        
        if (ticketId != null){
          ticketIds.push(ticketId);
        }

        const results = await Promise.all(
          ticketIds.map(async (ticketId) => {
            const response = await axios.get(`https://hpn-ticket.happynation.global/api/is-already-claimed/${ticketId}/`);
            return response.data.is_claimed;
          })
        );
        setAreClaimed(results);
      } catch (error) {
        console.error('Error verifying if the tickets have been already claimed:', error);
      }
    };
    checkIfClaimed();
  }, []);

  const sendSecurityCode = async (ticketId, email) => {
    try {
        // const response = await axios.post(`https://hpn-ticket.happynation.global/api/get-code/${ticketId}/${email}/`);
        // if (response.data.status === 'success') {
        //     setSecurityCodeSent(true);
        //     setError(null);
        // }
    setSecurityCodeSent(true);
    } catch (error) {
        setError(error.response?.data?.message || error.message);
    }
  };

  const verifyAndClaim = async (ticketId) => {
      try {
          //const response = await axios.post(`https://hpn-ticket.happynation.global/api/claim-ticket/${ticketId}/${address}/`, {code: securityCode});
          setSuccessClaim(true);
          setError(null);
      } catch (error) {
          setError(error.message);
      }
  }

  return (
    <>
      <div className="self-stretch">
        <div className="relative z-2 flex flex-col justify-center bg-[url('../../public/images/vector1.png')] bg-cover bg-bottom bg-no-repeat">
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

                  {/* <DisplayTicket /> */}
                  <>
                    <div className="ticket-gallery overflow-hidden mt-12">
                    {/* <div className=" flex justify-center overflow-hidden mt-[6.094vw] sm:mt-[70px] xl:h-[52.396vw] h-[800px] md:h-[760pxpx] sm:h-[739px]">  */}
                      <div className="relative xl:h-[52.396vw]"> 
                      {ticketCount == 1 ?
                        <div className="flex items-center justify-center p-2 h-[800px] w-auto">
                          <div 
                          className='w-full h-full'
                          onMouseEnter={() => setIsFlipped(true)}
                          onMouseLeave={() => setIsFlipped(false)}
                          >
                            <div style={flipperStyle}>
                              <img src={tickets?.[0]?.full_ticket_front} alt="Front" className='absolute w-full h-[800px] sm:h[739px] backface-hidden object-contain' style={{
                              backfaceVisibility: 'hidden'
                            }}/>
                              <img src={tickets?.[0]?.full_ticket_back} alt="Back" className='absolute w-full h-[800px] sm:h[739px] backface-hidden object-contain rotate-y-180' style={{
                              backfaceVisibility: 'hidden',
                              transform: 'rotateY(180deg)'
                            }}/>
                            </div>
                          </div>
                        </div>
                      :
                      <Slider ref={sliderRef} {...settings}>
                          { tickets.map((ticket, index) => (
                            <div key={index} className="flex items-center justify-center p-2 h-[800px] w-auto">

                                <div 
                                className='w-full h-full'
                                onMouseEnter={() => setIsFlipped(true)}
                                onMouseLeave={() => setIsFlipped(false)}
                                >
                                  <div style={flipperStyle}>
                                    <img src={ticket.full_ticket_front} alt="Front" className='absolute w-full h-[800px] sm:h[739px] backface-hidden object-contain' style={{
                                    backfaceVisibility: 'hidden'
                                  }}/>
                                    <img src={ticket.full_ticket_back} alt="Back" className='absolute w-full h-[800px] sm:h[739px] backface-hidden object-contain rotate-y-180' style={{
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)'
                                  }}/>
                                  </div>
                                </div>
                            </div>
                          ))}
                        </Slider>
                        }
                      
                        
                      </div>
                    </div>
                    {ticketCount == 1 ?
                    <></>
                    :
                      
                    <div className="sm:hidden">
                          <button onClick={goPrev} className='absolute left-[10%] md:left-[10%] z-10 top-1/2 transform -translate-y-1/2'>
                            <img src={leftArrow} className="w-10 h-10" />
                          </button>
                          <button onClick={goNext} className='absolute right-[10%] md:right-[10%] z-10 top-1/2 transform -translate-y-1/2'>
                            <img src={rightArrow} className="w-10 h-10" />
                          </button>
                    </div>
                    }
                    <div>
                    <div className="mt-[7.813vw] sm:mt-[67px] mb-[115px] flex justify-center md:items-center gap-[35px] md:flex-col ">

                      <Button onClick={handleDownload} type="submit" shape="round" color="yellow_800_red_500" className="flex justify-center min-w-[386px] h-[57px] sm:min-w-[340px] sm:min-h-[39.6px] sm:mt-[40px]">
                            Download
                        </Button>

                      <div className="sm:mt-[-24.4px] md:mt-[-20px] flex justify-center md:w-full">
                        {areClaimed?.[activeIndex] ? 

<h1 className="flex items-center sm:min-w-[340px] w-[22vw] text-[#808080] text-center flex justify-center min-w-[386px] h-[57px] sm:min-w-[340px] sm:min-h-[39.6px] sm:mt-[40px]">This ticket has been claimed already</h1> 

                        :

                        <div className="flex justify-center">
                          {!securityCodeSent ? 
                            <div className="flex items-center justify-center">
                              {!isConnected ?
                                <h1 className="sm:min-w-[340px] w-[22vw] text-[#808080] text-center">You have to connect your wallet to claim your ticket</h1> 


                            :
                                <Button
                                size="md"
                                variant="outline"
                                color="red_600_yellow_800_01"
                                className="inline-flex sm:min-w-[340px] min-w-[386px] sm:min-h-[39.6px] min-h-[56.2px] border-gradient font-notosans"
                                onClick={() => sendSecurityCode(activeIndex+1, tickets?.[activeIndex]?.email)}
                              >
                                Claim my ticket
                              </Button>                             }
                            </div>

                          :
                          <>
                          {!successClaim ? 
                          <div className="flex flex-col items-start">
                          <div className="flex flex-col items-center w-full max-w-[386px]">
                            <Button
                              size="md"
                              variant="outline"
                              color="red_600_yellow_800_01"
                              onClick={() => verifyAndClaim(activeIndex+1)}
                              className="inline-flex w-full sm:min-w-[340px] min-w-[386px] sm:min-h-[39.6px] min-h-[56.2px] border-gradient font-notosans"
                            >
                              Verify and claim my ticket
                            </Button>
                          </div>
                          <p className="mt-4">A security code has been sent to your email. <br/>
                            Please enter it below:
                            <input 
                              type="text" 
                              value={securityCode} 
                              onChange={(e) => setSecurityCode(e.target.value)} 
                              placeholder="Enter security code"
                              className="w-full mt-4 p-2 border rounded" 
                            />
                          </p>
                          
                        </div>
                        :
                        <h1 className="flex items-center sm:min-w-[340px] w-[22vw] text-[#808080] text-center">Your ticket has been claimed, please verify into your wallet</h1> 
                          }
                          
                          </>
                         }
                       </div>}
                      </div>
                    </div>
                    </div>
                    </>

                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
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
                Background: {tickets?.[activeIndex]?.background?.name}
              </Heading>
              <Heading size="headingxs" as="h3" className="!font-notosans">
               Artist: {tickets?.[activeIndex]?.background?.author}
              </Heading>
              <TextNoto as="p" className="w-full leading-8">
                {dataAbout?.[0]?.description_1}
              </TextNoto>
            </div>
            <div className="mr-[76px] flex w-[92%] flex-col items-start gap-3 lg:w-full md:mr-0 md:w-full">
              <Heading as="h2" size="headingC">
              Character: {tickets?.[activeIndex]?.foreground?.name}
              </Heading>
              <Heading size="headingxs" as="h5" className="!font-notosans">
                Artist: {tickets?.[activeIndex]?.foreground?.author}
              </Heading>
              <TextNoto as="p" className="w-full leading-8">
                {dataAbout?.[0]?.description_2}
              </TextNoto>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
