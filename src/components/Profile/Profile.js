import React, { useContext } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ isUserLoggedIn }) {
	const currentUser = useContext(CurrentUserContext);
	// const [name, setName] = useState('');
	// const [email, setEmail] = useState('');

	// console.log(currentUser);
	return (
		<>
			<Header isUserLoggedIn={isUserLoggedIn} />
			<section className='profile'>
				<h2 className='profile__title'>Привет, Александр!</h2>
				<div className='profile__text-container'>
					<p className='profile__label'>Имя</p>
					<p className='profile__value'>{currentUser.name}</p>
				</div>
				<div className='profile__text-container'>
					<p className='profile__label'>Email</p>
					<p className='profile__value'>{currentUser.email}</p>
				</div>
				<div className='profile__button-container'>
					<button className='profile__edit-button' type='button' aria-label='Редактировать профиль'>
						Редактировать
					</button>
					<button className='profile__logout-button' type='button' aria-label='Выйти из профиля'>
						Выйти из аккаунта
					</button>
				</div>
			</section>
		</>
	);
}

export default Profile;
