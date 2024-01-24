import React, { useContext, useState, useEffect } from 'react';
import { Navbar } from '../../components/navbar/navbar';
import { ethers } from 'ethers';
import { StateContext } from '../../context/index.jsx';
import './CreateEvent.css';
import { useNavigate } from 'react-router-dom';

export const CreateEvent = () => {
  const { CreateEvent, connectWallet } = useContext(StateContext);
  const navigate = useNavigate();
  useEffect(() => {
    connectWallet();
  }, []);

  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    startDate: '',
    endDate: '',
    tot: '',
    streamLink: '',
    price: '', // Add price to the form state
  });

  const handleQuery = (name, e) => {
    setForm({ ...form, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const parsedTot = parseInt(form.tot, 10);
      await CreateEvent({
        ...form,
        tot: parsedTot,
        price: ethers.utils.parseUnits(form.price, 18),
      });

      // Store the form data in local storage
      localStorage.setItem('eventFormData', JSON.stringify(form));

      // Console log the form data
      console.log('Form data:', form);

      // Store title in local storage
      localStorage.setItem('eventTitle', form.title);

      // Redirect to join-event page
      navigate('/joint-event');
    } catch (err) {
      console.log(err);
    }
  };

  const [showMerchForm, setShowMerchForm] = useState(false);

  const handleCheckboxChange = () => {
    setShowMerchForm(!showMerchForm);
  };

  return (
    <div className="container">
      <nav>
        <Navbar />
      </nav>

      <div className="iframeContainer">
        <iframe
          src="https://my.spline.design/brokenstar-ac11b76b3ca185f857921d4e1cc728b1/"
          frameBorder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>

      <div className="container">
        <div className="form-field">
          <h1>New Event</h1>
          <form action="#" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="title"
              onChange={(e) => handleQuery('title', e)}
            />
            <textarea
              placeholder="details"
              onChange={(e) => handleQuery('subtitle', e)}
            />
            <input
              type="date"
              placeholder="start date"
              onChange={(e) => handleQuery('startDate', e)}
            />
            <input
              type="date"
              placeholder="end date"
              onChange={(e) => handleQuery('endDate', e)}
            />
            <input
              type="number"
              placeholder="number of participants"
              onChange={(e) => handleQuery('tot', e)}
            />
            <input
              type="number"
              placeholder="event fee"
              onChange={(e) => handleQuery('price', e)}
            />
            <input
              type="text"
              placeholder="url"
              onChange={(e) => handleQuery('streamLink', e)}
            />
            <input
              className="chk"
              type="checkbox"
              id="merchCheckbox"
              onChange={handleCheckboxChange}
            />
            <label className="merchCheckbox">
              Do you want to add Merch?
            </label>
            <button type="submit" className="creater">
              Create
            </button>
          </form>
        </div>
      </div>

      {showMerchForm && (
        <div className="form-field2">
          <h1 className="merch">Merch</h1>
          <form action="#">
            <input type="text" placeholder="Name of the Merch" /><br />
            <textarea rows={10} placeholder="Give details" /><br />
            <label className="size">Select the size of the Tee</label>
            <select name="size" id="">
              <option value="1">S</option>
              <option value="1">M</option>
              <option value="1">L</option>
              <option value="1">XL</option>
              <option value="1">XXL</option>
            </select>
            <label htmlFor="imageUpload" className="upload-label">
              Choose an image:
            </label>
            <input
              type="file"
              id="imageUpload"
              name="imageUpload"
              accept="image"
            ></input>
          </form>
        </div>
      )}
    </div>
  );
};
