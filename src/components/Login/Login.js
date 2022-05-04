import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Login.css';

export default function Login({ onLogin }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleChangeEmail(e) {
		setEmail(e.target.value);
	}

	function handleChangePassword(e) {
		setPassword(e.target.value);
	}

	function handleSubmitLogin(e) {
		e.preventDefault();
		onLogin(email, password);
	}
	return (
		<section className='login'>
			<div className='login__container'>
				<Logo />
				<h2 className='login__title'>Рады видеть!</h2>
				<form className='login__form' onSubmit={handleSubmitLogin}>
					<label className='login__form-label'>
						E-mail
						<input
							className='login__form-input'
							id='email-input'
							type='email'
							autoComplete='email'
							placeholder='Введите пожалуйста ваш email'
							value={email ?? ''}
							onChange={handleChangeEmail}
						></input>
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
							placeholder='Введите пожалуйста ваш пароль'
							value={password ?? ''}
							onChange={handleChangePassword}
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
