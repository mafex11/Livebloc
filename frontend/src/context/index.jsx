import React, { useState, createContext, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import contractabi from '../../../eventcreater/artifacts-zk/contracts/Contract.sol/EventScheduler.json';

export const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [providerConnected, setProviderConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [raiseList, setRaiseList] = useState();
  const [routeIndexVote, setRouteIndexVote] = useState();
  const [routeIndexMore, setRouteIndexMore] = useState();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contractAddress = '0xcF3223625ecE5aC74107502a9226f3E26EF76E6C';
  const abi = contractabi.abi;
  const signer = provider.getSigner();
  const providerContract = new ethers.Contract(contractAddress, abi, signer);
  console.log("provider",provider);

  const connectWallet = async () => {
    try {
      // console.log("hi")
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = provider.getSigner();
      setProviderConnected(true);
      setCurrentUser(await signer.getAddress());
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  const CreateEvent = async (creater, title, subtitle, startdate, price, totalParticipants, endDate, streamLink) => {
    try {
      const newSignedContract = new ethers.Contract(contractAddress, abi, signer);
      await newSignedContract.CreateEvents(creater, title, subtitle, startdate, endDate, price, totalParticipants, streamLink);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  // await CreateEvent("0xB5F299478C1D660459cc02Ea6F3D1A5837649D0",'name','name',23,2,3,24,'name.com');


  const JoinEvent = async (title, amt) => {
    try {
      const newSignedContract = new ethers.Contract(contractAddress, abi, signer);
      await newSignedContract.JoinEvent(title, { value: ethers.utils.parseEther(String(amt)) });
      console.log("event join successfull");
    } catch (error) {
      console.error('Error joining event:', error);
    }
  };

  const returnAmount = async (EventId) => {
    try {
      const newSignedContract = new ethers.Contract(contractAddress, abi, signer);
      let temp = [];
      let i = 0;
      while (true) {
        try {
          const info = await newSignedContract.getAmountCollected(EventId);
          i++;
          temp.push(info);
        } catch (error) {
          break;
        }
      }
      console.log(temp);
      return temp;
    } catch (error) {
      console.error('Error fetching amount:', error);
      return [];
    }
  };

  const withdraw = async (id) => {
    try {
      const newSignedContract = new ethers.Contract(contractAddress, abi, signer);
      await newSignedContract.Vote(id);
      console.log('!');
    } catch (error) {
      console.error('Error voting:', error);
    }
  };


  return <StateContext.Provider value={{ providerConnected,
    currentUser,
    raiseList,
    routeIndexVote,
    routeIndexMore,
    connectWallet,
    CreateEvent,
    JoinEvent,
    returnAmount,
    withdraw,}}>{children}</StateContext.Provider>;
};