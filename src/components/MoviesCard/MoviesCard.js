import React from 'react';
import './MoviesCard.css';

function MoviesCard({ id, name, duration, image, alt, trailerLink, isLikeButton, isDeleteButton }) {
	// const [isLiked, setIsLiked] = React.useState(false);

	function showDeleteIcon(e) {
		if (!isDeleteButton) return;
		const card = e.currentTarget;
		const button = card.querySelector('.movies-card__delete-button');
		button.classList.add('movies-card__delete-button_active');
	}

	function hideDeleteIcon(e) {
		if (!isDeleteButton) return;
		const card = e.currentTarget;
		const button = card.querySelector('.movies-card__delete-button');
		button.classList.remove('movies-card__delete-button_active');
	}

	function handleLikeClick(e) {
		if (!isLikeButton) return;
		const button = e.currentTarget;
		button.classList.toggle('movies-card__like-button_active');
	}

	return (
		<li className='movies-card' onMouseEnter={showDeleteIcon} onMouseLeave={hideDeleteIcon}>
			<img className='movies-card__image' src={`https://api.nomoreparties.co${image}`} alt={alt} />
			<div className='movies-card__description'>
				<div className='movies-card__text-container'>
					<h3 className='movies-card__title'>{name}</h3>
					<p className='movies-card__duration'>{duration}м</p>
				</div>
				<button
					className={`${isLikeButton ? 'movies-card__like-button' : 'movies-card__like-button_disable'}`}
					type='button'
					aria-label='Отметить понравимшимся'
					onClick={handleLikeClick}
				></button>
				<button
					className={` ${isDeleteButton ? 'movies-card__delete-button' : 'movies-card__delete-button_disable'}`}
					type='button'
					aria-label='Удалить карточку'
				></button>
			</div>
		</li>
	);
}

export default MoviesCard;
