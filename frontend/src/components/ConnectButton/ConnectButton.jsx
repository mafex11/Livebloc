import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const ConnectButton = ({ title }) => {
  const [web3, setWeb3] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(true);

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        window.ethereum.autoRefreshOnNetworkChange = false;

        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          setConnectedAccount(accounts[0]);
        } else {
          setConnectedAccount(null);
        }

        window.ethereum.on('accountsChanged', (newAccounts) => {
          if (newAccounts.length > 0) {
            setConnectedAccount(newAccounts[0]);
          } else {
            setConnectedAccount(null);
          }
        });

        window.ethereum.on('chainChanged', (chainIdHex) => {
          const chainId = parseInt(chainIdHex, 16);
          console.log('Chain changed:', chainId);
        });
      } else {
        console.error('Metamask is not installed');
        setIsMetamaskInstalled(false);
      }
    };

    initializeWeb3();
  }, []);

  const connectMetamask = async () => {
    try {
      if (isConnecting) {
        console.log('Metamask connection request already in progress. Please wait.');
        return;
      }

      setIsConnecting(true);

      if (!isMetamaskInstalled) {
        console.error('Metamask is not installed');
        setIsConnecting(false);
        return;
      }

      const accounts = await web3.eth.getAccounts();

      if (accounts.length > 0) {
        console.log('Metamask already connected:', accounts[0]);
        setConnectedAccount(accounts[0]);
      } else {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      }
    } catch (error) {
      console.error('Error connecting to Metamask:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div>
      <button onClick={connectMetamask}>
        {isConnecting ? 'Connecting...' : connectedAccount ? connectedAccount : title}
      </button>
    </div>
  );
};

export default ConnectButton;
