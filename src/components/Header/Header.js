import React, { useState } from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { NavLink } from 'react-router-dom';

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
				<nav className={`header__movies-links_${className}`}>
					<NavLink className='header__movies-link' exact to='/movies' activeClassName='header__link_active'>
						Фильмы
					</NavLink>
					<NavLink className='header__saved-movies-link' exact to='/saved-movies' activeClassName='header__link_active'>
						Сохраненные фильмы
					</NavLink>
				</nav>
				<div className={`header__auth-links_${className}`}>
					<Link className='header__register-link' to='/signup'>
						Регистрация
					</Link>
					<Link className='header__login-link' to='/signin'>
						Войти
					</Link>
				</div>
				<nav className={`header__profile-links_${className}`}>
					<NavLink className='header__profile-link' to='/profile' activeClassName='header__link_active'>
						Аккаунт
					</NavLink>
					<NavLink className='header__profile-icon-link' to='/profile'></NavLink>
				</nav>
			</nav>
			<BurgerMenu isOpen={isBurgerMenuOpen} onClose={handleToogleBurgerMenu} />
		</header>
	);
}

export default Header;
