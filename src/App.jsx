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
import { WagmiConfig } from "wagmi";

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
                          <TicketDetailsSection />
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