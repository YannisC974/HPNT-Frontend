import React, { useEffect, useState, useRef } from "react";
import { Heading, HeadingShadow, Button, Text, TextShadow } from "../components";
import { useNavigate } from 'react-router-dom';
import { SubmitWallet } from "../components/SubmitWallet";
import axios from "axios";
import { useWeb3ModalAccount } from '@web3modal/ethers/react';

const useGetHeroData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://hpn-ticket.happynation.global/data/hero-data-json/'); 
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

export default function Hero() {
  const navigate = useNavigate();
  const { data, error, isLoading, isError } = useGetHeroData();
  const [warning, setWarning] = useState('');

  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const logout = async () => {
    // localStorage.removeItem('ticketId');
    // localStorage.removeItem('ticketIds');
    localStorage.clear();
    console.log("Local storage after cleaning should be empty", localStorage);
    const res = await axios.post('https://hpn-ticket.happynation.global/api/logout/');
    if (res.status === 200) {
      navigate('/login');
    }
  };

  const handleLogoutClick = () => {
    if (isConnected) {
        setWarning('Please disconnect from your wallet to logout.');
    } else {
        setWarning('');
        logout();
    }
};

  useEffect(() => {
    console.log("LOCAL STOARGE", localStorage);
  },[]);

  return (
    <div className="self-stretch">
      {/* my ticket section */}
      <div className="relative z-[2] bg-[url(public/images/background.png)] bg-cover bg-no-repeat h-auto bg-center overflow-hidden">
        <div className="flex flex-col md:items-center ml-[6.25vw] mr-[6.25vw] md:ml-0 md:mr-0 md:mt-2 mt-[3.333vw]">
          <div>
              <button 
                  onClick={handleLogoutClick} 
                  className="md:ml-[80vw] sm:ml-[65vw] md:text-[14px] md:mt-4 w-[11.979vw] md:ml-0 ml-[75.15vw] h-[3.8vw] text-[1.458vw] text-[#FFFFFF] border border-2 rounded-md md:w-[80px] md:h-[47px]"
              >
                  Logout
              </button>
              {warning && isConnected &&(
                  <p className="absolute text-red-500 text-center leading-tight w-[15.979vw] mt-2 ml-[73.15vw] md:ml-[80vw] sm:ml-[65vw]">{warning}</p>
              )}
          </div>
            <HeadingShadow size="headings" as="h1" className="!text-white-a700 w-[54.479vw] md:w-[75vw] sm:w-[320px] mt-[25.042vw] md:mt-[400px]">
              {data?.[0]?.title}
            </HeadingShadow>
            <TextShadow
              size="textmd"
              as="p"
              className="w-[54.479vw] md:w-[75vw] sm:w-[320px] !text-white-a700 flex-col md:w-full md:mb-2 mt-[1.406vw]"
            >
              {data?.[0]?.subtitle}
            </TextShadow>
            <div className="md:flex md:items-start md:w-[75vw] sm:w-[320px] sm:items-center">
              <div className={`w-[22.917vw] md:text-[14px] mt-[1.719vw] mb-[4.427vw] h-[3.385vw] text-[1.458vw] text-[#FFFFFF] rounded-md md:w-[324px] md:h-[47px]`}>
                <w3m-button/>
              </div>
              
            </div>
            {/* <SubmitWallet login={false} /> */}
        </div>
      </div>
      </div>
  );
}



