import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Popup from '../Popup/Popup';
import { REG_EXP_EMAIL, REG_EXP_NAME } from '../../utils/config';
import ErrorModal from '../ErrorModal/ErrorModal';
import Preloader from '../Preloader/Preloader';

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
	const [isNameValid, setIsNameValid] = useState(false);
	const [isEmailValid, setIsEmailValid] = useState(false);
	const [errorValidationName, setErrorValidationName] = useState('');
	const [errorValidationEmail, setErrorValidationEmail] = useState('');

	useEffect(() => {
		setName(currentUser.name);
		setEmail(currentUser.email);
	}, [currentUser]);

	function handleInputNameChange(e) {
		console.log(e.target.value);
		setIsNameValid(REG_EXP_NAME.test(e.target.value));
		console.log(isNameValid);
		if (!isNameValid) {
			setErrorValidationName('Имя содержит недопустимые символы');
		} else {
			if (e.target.value.length < 2) {
				setErrorValidationName('Длина имени должна быть не менее 2 символов');
			} else if (e.target.value.length > 30) {
				setErrorValidationName('Длина имени должна должна быть не более 30 символов');
			} else {
				setErrorValidationName('');
			}
		}
		setName(e.target.value);
	}

	function handleInputEmailChange(e) {
		setIsEmailValid(REG_EXP_EMAIL.test(e.target.value));
		if (!isEmailValid) {
			setErrorValidationEmail('Email содержит недопустимые символы');
		} else {
			setErrorValidationEmail('');
		}
		setEmail(e.target.value);
	}

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
						{errorValidationName && (
							<span className='profile__input-span-error' id='email-input-error'>
								{errorValidationName}
							</span>
						)}
					</label>
					<label className='profile__form-label'>
						Email
						<input className='profile__input' type='email' value={email || ''} onChange={handleInputEmailChange} />
						{errorValidationEmail && (
							<span className='profile__input-span-error' id='email-input-error'>
								{errorValidationEmail}
							</span>
						)}
					</label>
					<button
						className='profile__form-submit-button'
						type='submit'
						disabled={
							!(
								!errorValidationName &&
								!errorValidationEmail &&
								(currentUser.name !== name || currentUser.email !== email)
							)
						}
					>
						Сохранить
					</button>
				</form>
			</Popup>
			<ErrorModal isOpen={isErrorModalOpen} onClose={onCloseModal} errorData={errorData} />
		</>
	);
}

export default Profile;
