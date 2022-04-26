import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Register.css';

function Register() {
	return (
		<section className='register'>
			<div className='register__container'>
				<Logo />
				<h2 className='register__title'>Добро пожаловать!</h2>
				<form className='register__form'>
					<label className='register__form-label'>
						Имя
						<input className='register__form-input' id='name-input' type='text' autoComplete='off'></input>
						<span className='register__form-error' id='name-input-error'>
							Что-то пошло не так
						</span>
					</label>

					<label className='register__form-label'>
						E-mail
						<input className='register__form-input' id='email-input' type='email' autoComplete='name'></input>
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
