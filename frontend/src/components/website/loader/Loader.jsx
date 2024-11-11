import React from 'react';
import {FaSpinner} from "react-icons/fa";
import "./loader.scss";

function Loader() {
  return (
    <div className="spinner text__color">
      <h1>ECE Resource Hub!!!</h1>
      <FaSpinner className="loader-icon" />
      <p>Loading...</p>
    </div>
  )
}

export default Loader