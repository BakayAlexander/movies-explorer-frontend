import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Register.css';

function Register({ onRegister }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleChangeName(e) {
		setName(e.target.value);
	}

	function handleChangeEmail(e) {
		setEmail(e.target.value);
	}

	function handleChangePassword(e) {
		setPassword(e.target.value);
	}

	function handleSubmitRegister(e) {
		e.preventDefault();
		onRegister(name, email, password);
	}

	return (
		<section className='register'>
			<div className='register__container'>
				<Logo />
				<h2 className='register__title'>Добро пожаловать!</h2>
				<form className='register__form' onSubmit={handleSubmitRegister}>
					<label className='register__form-label'>
						Имя
						<input
							className='register__form-input'
							id='name-input'
							type='text'
							autoComplete='name'
							placeholder='Введите пожалуйста ваше имя'
							value={name ?? ''}
							onChange={handleChangeName}
						></input>
						<span className='register__form-error' id='name-input-error'>
							Что-то пошло не так
						</span>
					</label>

					<label className='register__form-label'>
						E-mail
						<input
							className='register__form-input'
							id='email-input'
							type='email'
							autoComplete='email'
							placeholder='Введите пожалуйста ваш email'
							value={email ?? ''}
							onChange={handleChangeEmail}
						></input>
						<span className='register__form-error' id='email-input-error'>
							Что-то пошло не так
						</span>
					</label>

					<label className='register__form-label'>
						Пароль
						<input
							className='register__form-input'
							id='password-input'
							type='password'
							autoComplete='new-password'
							placeholder='Введите пожалуйста ваш пароль'
							value={password ?? ''}
							onChange={handleChangePassword}
						></input>
						<span className='register__form-error' id='password-input-error'>
							Что-то пошло не так
						</span>
					</label>
					<button className='register__submit-button' type='submit'>
						Зарегистрироваться
					</button>
					<div className='register__link-container'>
						<span className='register__signup-span'>Уже зарегистрированны? </span>
						<Link className='register__signup-link' to='/signin'>
							Войти
						</Link>
					</div>
				</form>
			</div>
		</section>
	);
}

export default Register;
