import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Heading, Text, Input, Button } from "../components";
import {SubmitWallet} from "../components/SubmitWallet";
import ReCAPTCHA from "react-google-recaptcha";
import { useWeb3ModalAccount } from '@web3modal/ethers/react';

const useGetLoginData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://hpn-ticket.happynation.global/data/home-data-json/'); 
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

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);
  const [challenge, setChallenge] = useState('');
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { data, error: errorQuery, isLoading: isLoadingQuery, isError: isErrorQuery } = useGetLoginData();

  const onSubmitWithReCAPTCHA = async () => {
    const token = await recaptchaRef.current.executeAsync();
    setRecaptchaToken(token);
  };

  useEffect(() => {
    localStorage.clear()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // if (!recaptchaToken) {
    //   setErrors({ captcha: ["You must pass the captcha"] });
    //   return;
    // }

    setLoading(true);
    try {
      const res = await axios.post('https://hpn-ticket.happynation.global/api/token/', { username, password }, {withCredentials: true});
      if (res != null) {
        localStorage.setItem('ticketId', username);
        navigate('/my-ticket');
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        alert("Error occured");
      }
    } finally {
      setLoading(false);
      setRecaptchaToken(null);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    }
  };

  // const getChallenge = async () => {
  //   try {
  //     const res = await axios.post('https://hpn-ticket.happynation.global/api/get-challenge/', {address});
  //     if (res) {
  //       await setChallenge(res.data.challenge); 
  //     }
  //     return res;
  //   } catch (error) {
  //     console.error("Get challenge failed", error);
  //     throw error; 
  //   }
  // }
  
  // const getSignature = async (challenge) => {
  //   try {
  //     const signature = await signMessage({message: challenge});
  //     return signature;
  //   } catch (error) {
  //     console.error("Signing message failed", error);
  //     throw error; 
  //   }
  // }
  
  // const handleSubmitWallet = async () => {
  //   try {
  //     const response = await getChallenge();
  //     console.log(response);
  //     const challenge = response.data.challenge;
  //     const signature = getSignature(challenge);
  //   } catch (error) {
  //     console.error('Fail', error);
  //   }
  // }

  useEffect(() => {
    const verifyTokens = async () => {
      try {
        if (isConnected && address){
          const res = await axios.post('https://hpn-ticket.happynation.global/api/verify-and-authenticate-wallet/', {address: address});
          if (res){
            localStorage.setItem('ticketIds', JSON.stringify(res.data.ticketIds));
            console.log(localStorage);
            navigate('/my-ticket');
          } else {
            navigate('login');
          }
        }
      } catch(error){
        console.error('Error');
      }
    }
    if (isConnected && address){
      verifyTokens();
    }
  }, [isConnected])

  // useEffect(() => {
  //   const verifyTokens = async () => {
  //     try {
  //       if (isConnected && address && signature && challenge){
  //         console.log("Before the call");
  //         const res = await axios.post('https://hpn-ticket.happynation.global/api/verify-and-authenticate-wallet/', {address: address, challenge: challenge, signature: signature});
  //         if (res){
  //           localStorage.setItem('ticketIds', JSON.stringify(res.data.ticketIds));
  //           console.log(localStorage);
  //           navigate('/my-ticket');
  //         } else {
  //           navigate('login');
  //         }
  //       }
  //     } catch(error){
  //       console.error('Error');
  //     }
  //   }
  //   if (isConnected && address){
  //     verifyTokens();
  //   }
  // }, [signature])

  return (
    <div className="flex flex-col-reverse overflow-hidden md:flex-row">
      <div className="md:absolute flex flex-col justify-center md:items-center pl-[7.448vw] pr-[3.177vw] md:pt-[49px] md:pl-[6.667vw] md:pr-[6.667vw] overflow-hidden w-[42.969vw] md:w-full max-md:ml-0 max-md:w-full md:bottom-0 h-screen md:h-auto rounded-tr-[1.771vw] md:rounded-tl-[16px] md:rounded-br-0 md:rounded-tr-[16px] rounded-br-[1.771vw] bg-yellow-50">

        <h1 className="md:max-w-[90vw] ml-1.5 md:w-[340px] text-[3.333vw] md:text-[34px] font-medium leading-tight">
          Your Key to new experiences
        </h1>

        <p className="font-roboto md:text-[14px] md:max-w-[90vw] font-regular text-[1.25vw] leading-6 mt-[1.042vw] md:mt-[10px] md:w-[340px]">
          {data?.[0]?.description}
        </p>

        <div className="flex md:mt-[20px] md:mb-[30px] w-full">
          <div className="flex w-full flex-col items-start md:items-center">
            <form onSubmit={handleSubmit} className="flex flex-col md:items-center">
              <Input 
                shape="square"
                type="text"
                name="Ticket Number Field"
                value={username}
                placeholder={'Ticket number'}
                className="w-[30.312vw] text-[1.25vw] md:text-[14px] md:w-[324px] md:max-w-[90vw]"
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <div className="error-message text-[14px]">
                  {errors.username.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
              <Input 
                shape="square" 
                name="Key Code Field" 
                type="password"
                placeholder={'Key code'} 
                value={password}
                className="w-[30.312vw] text-[1.25vw] md:text-[14px] md:w-[324px] md:max-w-[90vw]" 
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <div className="error-message text-[14px]">
                  {errors.username.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
            
              <Button type="submit" shape="round" color="yellow_800_red_500" className="mt-[3.542vw] md:mt-[60px] w-[30.312vw] md:max-w-[90vw] h-[3.8vw] md:w-[324px] md:h-[47px]">
                Login
              </Button>
              
            </form>

            <div className="mt-[1.635vw] md:mt-[16px] mb-[1.635vw] md:mb-[16px] flex md:items-center md:justify-center self-stretch">
              <div className="mb-[1.635vw] mt-[1.635vw] md:mt-[10px] md:mb-[10px] h-px w-[12.917vw] md:w-[138px] bg-deep_orange-a200" />
              <Text as="p" size="or" className="ml-[1.563vw] md:ml-[15px] md:mr-[15px] self-center justify-center">
                or
              </Text>
              <div className="mb-[1.635vw] mt-[1.635vw] md:mt-[10px] md:mb-[10px] ml-[1.563vw] md:ml-0 h-px md:w-[138px] w-[12.917vw] bg-deep_orange-a200" />
            </div>

            <w3m-button/>
          </div>
        </div>
      </div>
      <div className="absolute flex flex-col right-0 md:top-0 md:w-full md:h-[100vh] z-[-1] overflow-hidden">
        <img 
          src="images/Artboard_4.png" 
          alt="Description de l'image" 
          className="flex h-screen w-full object-cover object-bottom"
        />
      </div>  
    </div>
  );
}

export default Login;
