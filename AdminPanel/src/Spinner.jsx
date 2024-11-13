import React from 'react';
import './spinner.css';
import logo from "./assets/logosmall.png";

const Spinner = () => {
  return (
    <div className="loading-spinner">
      <img src={logo} alt="Loading..." className="spinner-logo" />
    </div>
  );
};

export default Spinner;
