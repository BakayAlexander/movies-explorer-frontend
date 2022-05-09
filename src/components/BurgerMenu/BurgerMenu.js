import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './BurgerMenu.css';

function BurgerMenu({ isOpen, onClose, ...props }) {
	function handleOverlay(e) {
		if (e.target === e.currentTarget) {
			onClose();
		}
	}
	return (
		<div className={`burger-menu ${isOpen ? `burger-menu_is-opened` : ``}`} onClick={handleOverlay}>
			<div className='burger-menu__container'>
				<button className='burger-menu__close-button' onClick={onClose} />
				<nav className='burger-menu__navigation'>
					<NavLink className='burger-menu__link' exact to='/' activeClassName='burger-menu__link_active'>
						Главная
					</NavLink>
					<NavLink className='burger-menu__link' exact to='/movies' activeClassName='burger-menu__link_active'>
						Фильмы
					</NavLink>
					<NavLink className='burger-menu__link' exact to='/saved-movies' activeClassName='burger-menu__link_active'>
						Сохраненные фильмы
					</NavLink>
				</nav>
				<div className='burger-menu__profile-links'>
					<NavLink className='burger-menu__profile-link' to='/profile' activeClassName='burger-menu__link_active'>
						Аккаунт
					</NavLink>
					<Link className='burger-menu__profile-icon-link' to='/profile'></Link>
				</div>
			</div>
		</div>
	);
}

export default BurgerMenu;
