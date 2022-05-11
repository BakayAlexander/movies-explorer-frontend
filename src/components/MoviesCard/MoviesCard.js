import React from 'react';
import { DEFAULT_DATA_NOT_AVAILABLE, DEFAULT_URL_NOT_AVAILABLE, MOVIES_URL } from '../../utils/config';
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
	const isMobile = window.screen.width <= 1024;

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
				film.country || DEFAULT_DATA_NOT_AVAILABLE,
				film.director || DEFAULT_DATA_NOT_AVAILABLE,
				film.duration || 1,
				film.year || DEFAULT_DATA_NOT_AVAILABLE,
				film.description || DEFAULT_DATA_NOT_AVAILABLE,
				MOVIES_URL + film.image.url || DEFAULT_URL_NOT_AVAILABLE,
				film.trailerLink || DEFAULT_URL_NOT_AVAILABLE,
				MOVIES_URL + film.image.formats.thumbnail.url || DEFAULT_URL_NOT_AVAILABLE,
				film.id,
				film.nameRU || DEFAULT_DATA_NOT_AVAILABLE,
				film.nameEN || DEFAULT_DATA_NOT_AVAILABLE
			);
			button.classList.add('movies-card__like-button_active');
		} else if (button.classList.contains('movies-card__like-button_active')) {
			hadleClickDeleteButton();
			button.classList.remove('movies-card__like-button_active');
		}
	}

	function hadleClickDeleteButton() {
		onDeleteMovie(film._id, film.id);
	}

	function miutesToHours(time) {
		if (time <= 60) {
			return `${time}м`;
		}
		let mins = time % 60;
		let hours = (time - mins) / 60;
		return `${hours}ч ${mins}м`;
	}

	return (
		<li className='movies-card' onMouseOver={showDeleteIcon} onMouseLeave={hideDeleteIcon}>
			<a className='movies-card__trailer-link' href={film.trailerLink} target='_blank' rel='noreferrer'>
				<img
					className='movies-card__image'
					src={isAllMovies ? MOVIES_URL + film.image.url : film.image}
					alt={film.image.name}
				/>
			</a>
			<div className='movies-card__description'>
				<div className='movies-card__text-container'>
					<h3 className='movies-card__title'>{film.nameRU || film.nameEN}</h3>
					<p className='movies-card__duration'>{miutesToHours(film.duration)}</p>
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
					className={` ${isSavedMovies ? 'movies-card__delete-button' : 'movies-card__delete-button_disable'} ${
						isMobile && 'movies-card__delete-button_active'
					}`}
					type='button'
					aria-label='Удалить карточку'
					onClick={hadleClickDeleteButton}
				></button>
			</div>
		</li>
	);
}

export default MoviesCard;
