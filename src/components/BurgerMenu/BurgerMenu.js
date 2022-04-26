import React from 'react';
import { Link } from 'react-router-dom';
import './BurgerMenu.css';

function BurgerMenu({ isOpen, onClose, ...props }) {
	return (
		<div className={`burger-menu ${isOpen ? `burger-menu_is-opened` : ``}`}>
			<div className='burger-menu__container'>
				<button className='burger-menu__close-button' onClick={onClose} />
				<nav className='burger-menu__navigation'>
					<Link className='burger-menu__link' to='/'>
						Главная
					</Link>
					<Link className='burger-menu__link' to='/movies'>
						Фильмы
					</Link>
					<Link className='burger-menu__link' to='/saved-movies'>
						Сохраненные фильмы
					</Link>
				</nav>
				<div className='burger-menu__profile-links'>
					<Link className='burger-menu__profile-link' to='/profile'>
						Аккаунт
					</Link>
					<Link className='burger-menu__profile-icon-link' to='/profile'></Link>
				</div>
			</div>
		</div>
	);
}

export default BurgerMenu;
