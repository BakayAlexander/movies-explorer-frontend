import React from 'react';
import { MOVIES_URL } from '../../utils/config';
import './MoviesCard.css';

function MoviesCard({
	film,
	isAllMovies,
	isSavedMovies,
	handleSaveLikedMovie,
	onDeleteMovie,
	handleIsLike,
	likedMovies,
}) {
	function showDeleteIcon(e) {
		if (!isSavedMovies) return;
		const card = e.currentTarget;
		const button = card.querySelector('.movies-card__delete-button');
		button.classList.add('movies-card__delete-button_active');
	}

	function hideDeleteIcon(e) {
		if (!isSavedMovies) return;
		const card = e.currentTarget;
		const button = card.querySelector('.movies-card__delete-button');
		button.classList.remove('movies-card__delete-button_active');
	}

	function handleLikeClick(e) {
		if (!isAllMovies) return;
		const button = e.currentTarget;
		if (!button.classList.contains('movies-card__like-button_active')) {
			handleSaveLikedMovie(
				film.country,
				film.director,
				film.duration,
				film.year,
				film.description,
				MOVIES_URL + film.image.url,
				film.trailerLink,
				MOVIES_URL + film.image.formats.thumbnail.url,
				film.id,
				film.nameRU,
				film.nameEN
			);
			button.classList.add('movies-card__like-button_active');
		} else if (button.classList.contains('movies-card__like-button_active')) {
			hadleClickDeleteButton();
			button.classList.remove('movies-card__like-button_active');
		}
	}

	function hadleClickDeleteButton() {
		onDeleteMovie(film._id, film.id);
		// handleIsLike();
	}

	// const isLiked = likedMovies.some((likedMovie) => likedMovie.movieId === film.id);
	// console.log(isLiked);

	return (
		<li className='movies-card' onMouseEnter={showDeleteIcon} onMouseLeave={hideDeleteIcon}>
			<img
				className='movies-card__image'
				src={isAllMovies ? MOVIES_URL + film.image.url : film.image}
				alt={film.image.name}
			/>
			<div className='movies-card__description'>
				<div className='movies-card__text-container'>
					<h3 className='movies-card__title'>{film.nameRU || film.nameEN}</h3>
					<p className='movies-card__duration'>{film.duration}м</p>
				</div>
				<button
					className={
						isAllMovies
							? 'movies-card__like-button' +
							  ' ' +
							  (likedMovies.some((likedMovie) => likedMovie.movieId === film.id)
									? 'movies-card__like-button_active'
									: '')
							: 'movies-card__like-button_disable'
					}
					type='button'
					aria-label='Отметить понравимшимся'
					onClick={handleLikeClick}
				></button>
				<button
					className={` ${isSavedMovies ? 'movies-card__delete-button' : 'movies-card__delete-button_disable'}`}
					type='button'
					aria-label='Удалить карточку'
					onClick={hadleClickDeleteButton}
				></button>
			</div>
		</li>
	);
}

export default MoviesCard;
