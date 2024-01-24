// home.jsx

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Navbar } from '../../components/navbar/navbar';
import Meta from '../../components/Button/Meta';
import './home.css';

export const Home = () => {
  const [web3, setWeb3] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    } else {
      console.error('Metamask is not installed');
    }
  }, []);

  const handleWalletButtonClick = async () => {
    try {
      if (isConnecting) {
        console.log('Metamask connection request already in progress. Please wait.');
        return;
      }

      setIsConnecting(true);

      const accounts = await web3.eth.getAccounts();

      if (accounts.length > 0) {
        console.log('Metamask already connected:', accounts[0]);
        setIsWalletModalOpen(true);
      } else {
        await window.ethereum.enable();
      }
    } catch (error) {
      console.error('Error connecting to Metamask:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  return (
    <div className="container">
      <div className="iframeContainer">
        <iframe
          src="https://my.spline.design/particles-1721f0a12852526d9fc8670f11af6e34/"
          frameBorder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>

      <nav>
        <Navbar />
      </nav>

      <div id="mainContent">
        {/* Your existing content */}
        <p>
          Discover, Plan, Enjoy Your Event Schedule{' '}
          <span id="spam">Simplified!</span>
        </p>
      </div>

      <div className="Linker">
        {}
        <button
          id="walletbtn"
          onClick={handleWalletButtonClick}
          disabled={isConnecting}
        >
          {isConnecting ? 'Connecting...' : 'Wallet'}
        </button>

        {}
        {isWalletModalOpen && (
          <div className="walletModalContainer">
            <div className="walletModal">
              <span className="closeIcon" onClick={closeWalletModal}>
                &times;
              </span>
              <Meta />
            </div>
          </div>
        )}
      </div>

      <div className="Cards">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="Footer">
        <h3>powered by web3 devs NearCult </h3>
      </div>
    </div>
  );
};
