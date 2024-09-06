import React from 'react'
import Hero from './pages/Hero'
import TicketDetailsSection from './pages/TicketDetailsSection'
import VideoAndDescriptionSection from './pages/VideoAndDescription'
import Carousel from './pages/Carousel'
import FAQ from './pages/FAQ'
import Ticket from './pages/Ticket'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Get projectId
const projectId = '481e0aaf44358fcb63df9a5533bc0737'

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

// 3. Create a metadata object
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1 // used for the Coinbase SDK
})

// 5. Create a AppKit instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  enableAnalytics: true,
  themeMode: 'light' // Optional - defaults to your Cloud configuration
})


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

export default function App() {

  console.log("TicketID from login connection", localStorage.ticketId);
  console.log("TicketIDs from wallet connection", localStorage.ticketIds);

  return (
    <>
      <BrowserRouter>
        <div className="content">
              <Routes>
                <Route
                  path="/my-ticket"
                  element={
                    <ProtectedRoute>
                      <div className='w-full bg-yellow-50'>
                        <div className="flex flex-col items-center">
                          <Hero />
                          <Ticket />
                          {/* <TicketDetailsSection /> */}
                          <VideoAndDescriptionSection />
                          <Carousel />
                          <FAQ /> 
                        </div>
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />     
              </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}
