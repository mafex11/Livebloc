import React from "react";
import "./navbar.css";
import ConnectButton from '../ConnectButton/ConnectButton';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();

  const handleJointEventClick = () => {
    // Navigate to the "/joint-event" route
    navigate('/joint-event');
  };

  const handleCreateEventClick = () => {
    // Navigate to the "/create-event" route
    navigate('/create-event');
  };

  const handleProfileClick = () => {
    // Navigate to the "/profile" route
    navigate('/profile');
  };
  const handleHomeClick = () =>{
    navigate('/');
  };

  return (
    <div className="container">
      <div className="NavTop">
        <div className="logo" onClick={handleHomeClick}>LiveBloc</div>

        {/* <img alt="logo" /> */}
        <ConnectButton title="Connect" />
      </div>
      <div id="Options">
        <button className="otherbtn1" onClick={handleJointEventClick}>
          Join<br/>Event
        </button>
        <button className="otherbtn2" onClick={handleCreateEventClick}>
          Create<br/>Event
        </button>
        {/* <button className="otherbtn3" onClick={handleProfileClick}>
          Profile
        </button> */}
      </div>  
    </div>
  );
};
