import React from 'react';
import logo from '../images/logo-light.png';

const imgStyle = {
  padding: '20px 0',
  width: '200px',
  display: 'block',
  margin: 'auto',
}

const LogoHeader = () => {
  return (
    <div className="logo">
      <img src={logo} alt="txat app" style={imgStyle}/>
    </div>
  )
}

export default LogoHeader;