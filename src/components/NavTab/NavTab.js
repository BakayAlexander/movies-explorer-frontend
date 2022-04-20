import React from 'react';
import './NavTab.css';

function NavTab() {
	return (
		<nav className='navigation'>
			<a href='#' className='navigation__link'>
				О проекте
			</a>
			<a href='#' className='navigation__link'>
				Технологии
			</a>
			<a href='#' className='navigation__link'>
				Студент
			</a>
		</nav>
	);
}

export default NavTab;
