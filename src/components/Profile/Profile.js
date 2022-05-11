import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Popup from '../Popup/Popup';
import { REG_EXP_EMAIL, REG_EXP_NAME } from '../../utils/config';
import ErrorModal from '../ErrorModal/ErrorModal';

function Profile({
	isUserLoggedIn,
	onCloseModal,
	onOpenModal,
	isUpdateUserPopupOpen,
	onUpdateUser,
	isErrorModalOpen,
	errorData,
	onLogout,
}) {
	const currentUser = useContext(CurrentUserContext);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isNameValid, setIsNameValid] = useState(true);
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [errorValidationName, setErrorValidationName] = useState('');
	const [errorValidationEmail, setErrorValidationEmail] = useState('');

	// * Get current user data to states
	useEffect(() => {
		setName(currentUser.name);
		setEmail(currentUser.email);
	}, [currentUser]);

	function handleInputNameChange(e) {
		setIsNameValid(REG_EXP_NAME.test(e.target.value));
		setName(e.target.value);
	}

	function handleInputEmailChange(e) {
		setIsEmailValid(REG_EXP_EMAIL.test(e.target.value));
		setEmail(e.target.value);
	}

	function validateName(name) {
		if (currentUser.name === name) {
			setIsNameValid(false);
			return setErrorValidationName('');
		}
		if (isNameValid) {
			if (name.length < 2) {
				setIsNameValid(false);
				return setErrorValidationName('Длина имени должна быть не менее 2 символов');
			} else if (name.length > 30) {
				setIsNameValid(false);
				return setErrorValidationName('Длина имени должна должна быть не более 30 символов');
			} else {
				return setErrorValidationName('');
			}
		}
		if (!isNameValid) {
			return setErrorValidationName('Имя содержит недопустимые символы');
		}
	}

	function validateEmail(email) {
		if (currentUser.email === email) {
			setIsEmailValid(false);
			return setErrorValidationEmail('');
		}
		if (!isEmailValid) {
			setIsEmailValid(false);
			setErrorValidationEmail('Пожалуйста введите валидный email');
		} else {
			setErrorValidationEmail('');
		}
	}

	// * Validating name and email if inputs changed
	useEffect(() => {
		validateName(name);
		validateEmail(email);
	}, [name, email]);

	function handleSubmitUpdateUser(e) {
		e.preventDefault();
		onUpdateUser(email, name);
		onCloseModal();
	}

	return (
		<>
			<Header isUserLoggedIn={isUserLoggedIn} />
			<section className='profile'>
				<h2 className='profile__title'>Привет, {currentUser.name}!</h2>
				<div className='profile__text-container'>
					<p className='profile__label'>Имя</p>
					<p className='profile__value'>{currentUser.name}</p>
				</div>
				<div className='profile__text-container'>
					<p className='profile__label'>Email</p>
					<p className='profile__value'>{currentUser.email}</p>
				</div>
				<div className='profile__button-container'>
					<button
						className='profile__edit-button'
						type='button'
						aria-label='Редактировать профиль'
						onClick={onOpenModal}
					>
						Редактировать
					</button>
					<button className='profile__logout-button' type='button' aria-label='Выйти из профиля' onClick={onLogout}>
						Выйти из аккаунта
					</button>
				</div>
			</section>

			<Popup isOpen={isUpdateUserPopupOpen} onClose={onCloseModal}>
				<form className='profile__form' onSubmit={handleSubmitUpdateUser}>
					<h2 className='profile__form-title'>Введите новые данные</h2>
					<label className='profile__form-label'>
						Имя
						<input className='profile__input' type='text' value={name || ''} onChange={handleInputNameChange} />
						{!isNameValid && (
							<span className='profile__input-span-error' id='email-input-error'>
								{errorValidationName}
							</span>
						)}
					</label>
					<label className='profile__form-label'>
						Email
						<input className='profile__input' type='email' value={email || ''} onChange={handleInputEmailChange} />
						{!isEmailValid && (
							<span className='profile__input-span-error' id='email-input-error'>
								{errorValidationEmail}
							</span>
						)}
					</label>
					<button className='profile__form-submit-button' type='submit' disabled={!(isNameValid || isEmailValid)}>
						Сохранить
					</button>
				</form>
			</Popup>
			<ErrorModal isOpen={isErrorModalOpen} onClose={onCloseModal} errorData={errorData} />
		</>
	);
}

export default React.memo(Profile);
