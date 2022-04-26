import React from 'react';
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Header from '../Header/Header';
import Portfolio from '../Portfolio/Portfolio';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';

function Main() {
	return (
		<>
			<Header className='main' />
			<Promo />
			<AboutProject />
			<Techs />
			<AboutMe />
			<Portfolio />
		</>
	);
}

export default Main;
