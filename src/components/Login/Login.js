import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Login.css';

export default function Login() {
	return (
		<section className='login'>
			<div className='login__container'>
				<Logo />
				<h2 className='login__title'>Рады видеть!</h2>
				<form className='login__form'>
					<label className='login__form-label'>
						E-mail
						<input className='login__form-input' id='email-input' type='email' autoComplete='email'></input>
						<span className='login__form-error' id='email-input-error'>
							Что-то пошло не так
						</span>
					</label>

					<label className='login__form-label'>
						Пароль
						<input
							className='login__form-input'
							id='password-input'
							type='password'
							autoComplete='current-password'
						></input>
						<span className='login__form-error' id='password-input-error'>
							Что-то пошло не так
						</span>
					</label>
					<button className='login__submit-button' type='submit'>
						Войти
					</button>
					<div className='login__link-container'>
						<span className='login__signup-span'>Еще не зарегистрированны? </span>
						<Link className='login__signup-link' to='/signup'>
							Регистрация
						</Link>
					</div>
				</form>
			</div>
		</section>
	);
}
