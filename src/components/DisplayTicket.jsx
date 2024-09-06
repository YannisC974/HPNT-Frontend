import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button/Button';
import '../styles/DisplayTicket.css';
import TicketDetailsSection from '../pages/TicketDetailsSection';
import leftArrow from '../assets/left-arrow.png' 
import rightArrow from '../assets/right-arrow.png'; 


const DisplayTicket = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [areClaimed, setAreClaimed] = useState([]);
  const ticketIds = [1, 2];

  const sliderRef = useRef(null);

  const goNext = () => {
    sliderRef.current.slickNext();
  };

  const goPrev = () => {
    sliderRef.current.slickPrev();
  };

  // const [securityCodeSent, setSecurityCodeSent] = useState(false);
  const [securityCode, setSecurityCode] = useState('');
  const [link, setLink] = useState('');
  const [claimInfos, setClaimInfos] = useState(null);

  const imageRef = useRef(null);
  const navigate = useNavigate();

  const currentTicketId = ticketIds[activeIndex];

  const securityCodeSent = false;

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
  

  const handleDownload = async (ticketId) => {
    console.log("Button clicked");
    console.log(localStorage);
    try {
      // const ticketId = localStorage.getItem('ticketId');   
      const response = await axios.get("http://127.0.0.1:8000/api/download-ticket/", {
        params: {
          ticketNumber: ticketId,
        },
        withCredentials: true, 
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

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // const ticketIds = JSON.parse(localStorage.getItem('ticketIds')) || [];
        console.log("Before api call", ticketIds);
        const responses = await Promise.all(
          ticketIds.map((ticketId) => {
            console.log("ticket id", ticketId);
            return axios.get("http://127.0.0.1:8000/api/display-ticket/", {
              params: { ticketNumber: ticketId },
              withCredentials: true,
            });
          })
        );
        console.log("Response", responses);
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

  const checkIfClaimed = async () => {
    try {
      const results = await Promise.all(
        ticketIds.map(async (ticketId) => {
          const response = await axios.get(`http://127.0.0.1:8000/api/is-already-claimed/${ticketId}/`);
          return response.data.is_claimed;
        })
      );
      setAreClaimed(results);
    } catch (error) {
      console.error('Error verifying if the tickets have been already claimed:', error);
    }
  };

  useEffect(() => {
    checkIfClaimed();
  }, []);

  // useEffect(() => {
  //   console.log("Are claimed", areClaimed);
  // }, [])

  const sendSecurityCode = async (ticketId) => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/get-code/${ticketId}/yannis.juan974@gmail.com/`);
        if (response.data.status === 'success') {
            setSecurityCodeSent(true);
            setError(null);
        }
    } catch (error) {
        setError(error.response?.data?.message || error.message);
    }
  };

  const verifyAndClaim = async (ticketId) => {
      try {
          const response = await axios.post(`http://127.0.0.1:8000/api/claim-ticket/${ticketId}/${userAddress}/`, {code: securityCode});
          setClaimInfos(response.data);
          setError(null);
      } catch (error) {
          setError(error.message);
      }
  }

  return (
    <>
    <div className="ticket-gallery overflow-hidden mt-12">
    {/* <div className=" flex justify-center overflow-hidden mt-[6.094vw] sm:mt-[70px] xl:h-[52.396vw] h-[800px] md:h-[760pxpx] sm:h-[739px]">  */}
      <div className="relative xl:h-[52.396vw]"> 
      {ticketIds.length == 1 ?
        <div className="flex items-center justify-center p-2 h-[800px] w-auto">

        <div 
        className='w-full h-full'
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        >
          <div style={flipperStyle}>
            <img src={tickets[0].full_ticket_front} alt="Front" className='absolute w-full h-[800px] sm:h[739px] backface-hidden object-contain' style={{
            backfaceVisibility: 'hidden'
          }}/>
            <img src={tickets[0].full_ticket_back} alt="Back" className='absolute w-full h-[800px] sm:h[739px] backface-hidden object-contain rotate-y-180' style={{
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
    {ticketIds == 1 ?
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
        {areClaimed[currentTicketId] ? 

        <Button
          size="md"
          variant="outline"
          color="red_600_yellow_800_01"
          className="inline-flex sm:min-w-[340px] min-w-[386px] sm:min-h-[39.6px] min-h-[56.2px] border-gradient font-notosans"
        >
          Ticket already claimed
        </Button> 

        :

        <div>
          {!securityCodeSent ? 
          <Button
            size="md"
            variant="outline"
            color="red_600_yellow_800_01"
            className="inline-flex sm:min-w-[340px] min-w-[386px] sm:min-h-[39.6px] min-h-[56.2px] border-gradient font-notosans"
            onClick={() => sendSecurityCode(currentTicketId)}
          >
            Claim my ticket
          </Button> 

          :

          <div className="flex flex-col items-start">
            <div className="flex flex-col items-center w-full max-w-[386px]">
              <Button
                size="md"
                variant="outline"
                color="red_600_yellow_800_01"
                className="inline-flex w-full sm:min-w-[340px] min-w-[386px] sm:min-h-[39.6px] min-h-[56.2px] border-gradient font-notosans"
              >
                Verify and claim my ticket
              </Button>
            </div>
            <p className="mt-4">A security code has been sent to your email. <br/>
              Please enter it below:
            </p>
            <input 
                type="text" 
                value={securityCode} 
                onChange={(e) => setSecurityCode(e.target.value)} 
                placeholder="Enter security code"
                className="w-full mt-4 p-2 border rounded" 
              />
          </div>

          }
      </div>}
      </div>
    </div>
    </div>
    </>
  );
};

export default DisplayTicket;