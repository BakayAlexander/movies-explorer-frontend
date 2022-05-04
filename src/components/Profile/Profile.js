import React from 'react';
import './Profile.css';
import Header from '../Header/Header';

function Profile() {
	return (
		<>
			<Header className='movies' />
			<section className='profile'>
				<h2 className='profile__title'>Привет, Александр!</h2>
				<div className='profile__text-container'>
					<p className='profile__label'>Имя</p>
					<p className='profile__value'>Александр</p>
				</div>
				<div className='profile__text-container'>
					<p className='profile__label'>Email</p>
					<p className='profile__value'>xander.surf@yandex.ru</p>
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
