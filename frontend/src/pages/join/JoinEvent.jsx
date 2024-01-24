import React, { useContext, useState, useEffect } from 'react';
import { Navbar } from '../../components/navbar/navbar';
import { StateContext } from '../../context/index.jsx';
import './JoinEvent.css';

export const JoinEvent = () => {
  const { returnAmount, withdraw } = useContext(StateContext);
  const [eventDetails, setEventDetails] = useState({ title: '', price: 0 });

  useEffect(() => {
    // Fetch values from local storage
    const storedTitle = localStorage.getItem('eventTitle');
    const storedPrice = localStorage.getItem('eventFormData');

    // Update state with values from local storage
    if (storedTitle && storedPrice) {
      setEventDetails({
        title: storedTitle,
        price: parseFloat(JSON.parse(storedPrice).price), // Assuming price is stored as a string
      });
    }
  }, []);

  const handlePayment = async () => {
    try {
      // Your payment processing logic here...

      // Open a new tab and redirect to the specified URL
      const newTab = window.open(
        `http://localhost:3030?title=${eventDetails.title}&price=${eventDetails.price}`,
        '_blank'
      );
      if (newTab) {
        // Tab opened successfully
        // You can perform additional actions or update UI as needed
      } else {
        // Failed to open a new tab
        console.error('Failed to open a new tab.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div className="join-event">
      <nav>
        <Navbar />
      </nav>
      <iframe
        className="background-iframe"
        src="https://my.spline.design/cubes-ca20546ea9cf0593df40f4b4b5349807/"
        frameBorder="0"
        title="background-iframe"
      ></iframe>

      <div className="content">
        <h1>Join</h1>
        <div className="cardholder">
          {/* Display your cards */}
          {Array.from({ length: 1 }).map((_, index) => (
            <div className="card" key={index}>
              <div className="thumb"></div>
              <h1 className="title">{eventDetails.title}</h1>
              <h2 className="title2">{eventDetails.price}</h2>
              <button className="paymentbtn" onClick={handlePayment}>
                Join
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

