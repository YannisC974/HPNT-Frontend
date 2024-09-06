import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CustomConnectButton } from "../components/ConnectButton";
import { useAccount, useSignMessage } from 'wagmi';
import { Button } from "./Button/Button";

axios.defaults.withCredentials = true;

export const SubmitWallet = ({login}) => {
    const navigate = useNavigate();
    const [challenge, setChallenge] = useState('');
    const { address, isConnected } = useAccount();
    const { data: signature, error, isError, isLoading, isSuccess, signMessage } = useSignMessage();

    const getChallenge = async () => {
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/get-challenge/', { address });
            if (res) {
                setChallenge(res.data.challenge);
            }
            return res;
        } catch (error) {
            console.error("Get challenge failed", error);
            throw error;
        }
    }

    const handleSubmitWallet = async () => {
        try {
            const response = await getChallenge();
            const challenge = response.data.challenge;
            const signature = await signMessage({ message: challenge });
            if (signature) {
                verifyTokens(challenge, signature);
            }
        } catch (error) {
            console.error('Fail', error);
        }
    }

    const verifyTokens = async (challenge, signature) => {
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/verify-and-authenticate-wallet/', { address, challenge, signature });
            if (res) {
                localStorage.setItem('ticketIds', JSON.stringify(res.data.ticketIds));
                navigate('/my-ticket');
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error', error);
            navigate('/login');
        }
    }

    useEffect(() => {
        if (isConnected && address && challenge && signature) {
            verifyTokens(challenge, signature);
        }
    }, [isConnected, address, challenge, signature]);

    useEffect(() => {
        const disconnect = async () => {
            if (!isConnected && !address) {
                const res = await axios.post('http://127.0.0.1:8000/api/logout-wallet/');
                if (res.status === 200) {
                    localStorage.removeItem('ticketIds');
                    const ticketId = localStorage.getItem('ticketId');
                    if (ticketId == null){
                        navigate('/login');
                    }
                }
            }
        }
        disconnect();
    }, [isConnected]);

    // useEffect(() => {
    //     const handleSubmitWallet = async () => {
    //         try {
    //             const response = await getChallenge();
    //             const challenge = response.data.challenge;
    //             const signature = await signMessage({ message: challenge });
    //             if (signature) {
    //                 verifyTokens(challenge, signature);
    //             }
    //         } catch (error) {
    //             console.error('Fail', error);
    //         }
    //     }
    //     if (login && isConnected && address){
    //         handleSubmitWallet();
    //     }
    // }, [login, address, isConnected])

    // Fetch the challenge when login, isConnected, and address are truthy
    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const response = await getChallenge();
                setChallenge(response.data.challenge);
            } catch (error) {
                console.error('Failed to get challenge', error);
            }
        };

        if (login && isConnected && address) {
            fetchChallenge();
        }
    }, [login, isConnected, address]);

    // Sign the message when the challenge is available
    useEffect(() => {
        const signChallengeMessage = async () => {
            try {
                const signature = await signMessage({ message: challenge });
                setSignature(signature);
            } catch (error) {
                console.error('Failed to sign message', error);
            }
        };

        if (challenge) {
            signChallengeMessage();
        }
    }, [challenge]);

    // Verify tokens when both challenge and signature are available
    useEffect(() => {
        const verifyTokens = async () => {
            try {
                await verifyTokens(challenge, signature);
            } catch (error) {
                console.error('Failed to verify tokens', error);
            }
        };

        if (challenge && signature) {
            verifyTokens();
        }
    }, [challenge, signature]);

    if (login){
        return (
            <div>
                <Button variant="outlineTransparent" shape="round" color="yellow_900_red_600" className="border-gradient2 w-[30.312vw] md:w-[324px] md:h-[47px] h-[3.8vw]">
                    {/* {isConnected ? <button onClick={handleSubmitWallet}>
                        Verify your token
                    </button> : <></>} */}
            
                    <CustomConnectButton />
                </Button>
            </div>
        );
    }

    return (
        <div>
            <button className="font-medium w-[30.312vw] border-[#f6aa1a] h-[3.8vw] md:h-[47px] md:w-[324px] rounded-md bg-transparent border border-gradient-to-r from-[#f6aa1a] via-[#3B82F6] to-[#9333EA]">
            {isConnected ? (
                <button onClick={handleSubmitWallet}>
                Verify your token
                </button>
            ) : (
                <></>
            )}
            <CustomConnectButton />
            </button>
        </div>
    );
};
