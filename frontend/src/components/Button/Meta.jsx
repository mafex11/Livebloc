// Meta.jsx

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import coinbase from "../../../public/coinbase.png";
import MetaMask from "../../../public/MetaMask.png";
import polygon from "../../../public/polygon.png";
import "./Meta.css";

const Meta = ({ closeWalletModal }) => {
  return (
    <div className="container">
      <div className="chooseYourWallet">
        <h4>Connect</h4>
      </div>
      <div className="options">
        <img src={coinbase} alt="Coinbase" />
        <img src={MetaMask} alt="MetaMask" />
        <img src={polygon} alt="Polygon" />
      </div>
    </div>
  );
};

export default Meta;
