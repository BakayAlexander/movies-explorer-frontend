import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { REG_EXP_EMAIL, REG_EXP_NAME, REG_EXP_PASSWORD } from '../../utils/config';
import Logo from '../Logo/Logo';
import './Register.css';

function Register({ onRegister }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isNameValid, setIsNameValid] = useState(true);
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [errorValidationName, setErrorValidationName] = useState('');
	const [errorValidationEmail, setErrorValidationEmail] = useState('');
	const [errorValidationPassword, setErrorValidationPassword] = useState('');

	function handleChangeName(e) {
		setIsNameValid(REG_EXP_NAME.test(e.target.value));
		setName(e.target.value);
	}

	function handleChangeEmail(e) {
		setIsEmailValid(REG_EXP_EMAIL.test(e.target.value));
		setEmail(e.target.value);
	}

	function handleChangePassword(e) {
		setIsPasswordValid(REG_EXP_PASSWORD.test(e.target.value));
		setPassword(e.target.value);
	}

	function validateName(name) {
		if (name.length === 0) {
			setIsNameValid(false);
			return setErrorValidationName('');
		}
		if (isNameValid) {
			setErrorValidationName('');
			if (name.length < 2) {
				setIsNameValid(false);
				return setErrorValidationName('Длина имени должна быть не менее 2 символов');
			} else if (name.length > 30) {
				setIsNameValid(false);
				return setErrorValidationName('Длина имени должна должна быть не более 30 символов');
			}
		} else {
			return setErrorValidationName('Имя содержит недопустимые символы');
		}
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
		}
		if (!isPasswordValid) {
			setErrorValidationPassword('Пароль содержит недопустимые символы');
		} else {
			setErrorValidationPassword('');
		}
		console.log(password);
		console.log(isPasswordValid);
	}

	useEffect(() => {
		validateName(name);
		validateEmail(email);
		validatePassword(password);
	}, [name, email, password]);

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
						{errorValidationName && (
							<span className='register__form-error' id='name-input-error'>
								{errorValidationName}
							</span>
						)}
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
						{errorValidationEmail && (
							<span className='register__form-error' id='email-input-error'>
								{errorValidationEmail}
							</span>
						)}
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
						{errorValidationPassword && (
							<span className='register__form-error' id='password-input-error'>
								{errorValidationPassword}
							</span>
						)}
					</label>
					<button
						className='register__submit-button'
						type='submit'
						disabled={!isNameValid || !isEmailValid || !isPasswordValid}
					>
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
