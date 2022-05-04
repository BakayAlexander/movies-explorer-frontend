import React from 'react';
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Portfolio from '../Portfolio/Portfolio';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';

function Main({ isUserLoggedIn }) {
	return (
		<>
			<Header isUserLoggedIn={isUserLoggedIn} />
			<Promo />
			<AboutProject />
			<Techs />
			<AboutMe />
			<Portfolio />
			<Footer />
		</>
	);
}

export default Main;
