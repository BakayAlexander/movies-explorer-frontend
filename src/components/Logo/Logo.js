import React from 'react';
import './Logo.css';
import logo from '../../images/logo.svg';

function Logo() {
	return <img className='logo' src={logo} alt='Логотип проекта' />;
}

export default Logo;
