import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import './styles/font.css'
import './styles/tailwind.css'

import '@rainbow-me/rainbowkit/styles.css';
import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const amoy = {
  id: 80002,
  name: 'Amoy',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Polygon Amoy', symbol: 'MATIC', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc-amoy.polygon.technology']},
  },
  blockExplorers: {
    default: { name: 'Amoy', url: 'https://www.oklink.com/amoy'}
  }
};

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum, base, amoy],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

import { Provider } from "react-redux";
import { store } from "./store"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
            modalSize='compact'
              theme={darkTheme({
                accentColor: '#fff8ee',
                accentColorForeground: 'black',
                borderRadius: 'small',
                fontStack: 'system',
              })}
            >
              <App />
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </Provider>
  </React.StrictMode>,
)
