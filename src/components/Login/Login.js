import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { REG_EXP_EMAIL } from '../../utils/config';
import ErrorModal from '../ErrorModal/ErrorModal';
import Logo from '../Logo/Logo';
import './Login.css';

export default function Login({ onLogin, isErrorModalOpen, errorData, onCloseModal }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [errorValidationEmail, setErrorValidationEmail] = useState('');
	const [errorValidationPassword, setErrorValidationPassword] = useState('');

	function handleChangeEmail(e) {
		setIsEmailValid(REG_EXP_EMAIL.test(e.target.value));
		setEmail(e.target.value);
	}

	function handleChangePassword(e) {
		setPassword(e.target.value);
	}

	function validateEmail(email) {
		if (email.length === 0) {
			setIsEmailValid(false);
			return setErrorValidationEmail('');
		}
		if (!isEmailValid) {
			return setErrorValidationEmail('Пожалуйста введите валидный email');
		} else {
			setErrorValidationEmail('');
		}
	}

	function validatePassword(password) {
		if (password.length === 0) {
			setIsPasswordValid(false);
			return setErrorValidationPassword('');
		} else {
			setIsPasswordValid(true);
		}
	}

	// * Validating password and email if inputs changed

	useEffect(() => {
		validateEmail(email);
		validatePassword(password);
	}, [email, password]);

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
						{errorValidationEmail && (
							<span className='login__form-error' id='email-input-error'>
								{errorValidationEmail}
							</span>
						)}
					</label>

					<label className='login__form-label'>
						Пароль
						<input
							className='login__form-input'
							id='password-input'
							type='password'
							autoComplete='password'
							placeholder='Введите пожалуйста ваш пароль'
							value={password ?? ''}
							onChange={handleChangePassword}
						></input>
						{errorValidationPassword && (
							<span className='login__form-error' id='password-input-error'>
								{errorValidationPassword}
							</span>
						)}
					</label>
					<button className='login__submit-button' type='submit' disabled={!isEmailValid || !isPasswordValid}>
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
			<ErrorModal isOpen={isErrorModalOpen} onClose={onCloseModal} errorData={errorData} />
		</section>
	);
}
