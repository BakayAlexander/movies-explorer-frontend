import React, { useState } from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Header({ isUserLoggedIn, ...props }) {
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

	function handleToogleBurgerMenu() {
		setIsBurgerMenuOpen(!isBurgerMenuOpen);
	}

	const className = isUserLoggedIn ? 'loggedin' : 'loggedout';

	return (
		<header className={`header ${className}`}>
			<nav className='header__container'>
				<Logo />
				<button className={`header__burger-menu-open-button_${className}`} onClick={handleToogleBurgerMenu} />
				<div className={`header__movies-links_${className}`}>
					<Link className='header__movies-link' to='/movies'>
						Фильмы
					</Link>
					<Link className='header__saved-movies-link' to='/saved-movies'>
						Сохраненные фильмы
					</Link>
				</div>
				<div className={`header__auth-links_${className}`}>
					<Link className='header__register-link' to='/signup'>
						Регистрация
					</Link>
					<Link className='header__login-link' to='/signin'>
						Войти
					</Link>
				</div>
				<div className={`header__profile-links_${className}`}>
					<Link className='header__profile-link' to='/profile'>
						Аккаунт
					</Link>
					<Link className='header__profile-icon-link' to='/profile'></Link>
				</div>
			</nav>
			<BurgerMenu isOpen={isBurgerMenuOpen} onClose={handleToogleBurgerMenu} />
		</header>
	);
}

export default Header;
