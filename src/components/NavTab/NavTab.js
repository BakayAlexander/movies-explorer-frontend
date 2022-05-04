import React from 'react';
import './NavTab.css';

function NavTab() {
	return (
		<nav className='navigation'>
			<a href='#about-project' className='navigation__link'>
				О проекте
			</a>
			<a href='#techs' className='navigation__link'>
				Технологии
			</a>
			<a href='#about-me' className='navigation__link'>
				Студент
			</a>
		</nav>
	);
}

export default NavTab;
