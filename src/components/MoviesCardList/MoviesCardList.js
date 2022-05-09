import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({
	films,
	isAllMovies,
	isSavedMovies,
	isMoreButton,
	allMovies,
	handleSaveLikedMovie,
	onDeleteMovie,
	handleIsLike,
	likedMovies,
}) {
	const [moviesNumber, setMoviesNumber] = useState(0);
	const [counterAddMovies, setCounterAddMovies] = useState(0);

	let display = window.screen.width;

	// let display = setTimeout(() => window.screen.width, 1000);

	function displayWidthCheck(display) {
		if (display >= 1280) {
			if (moviesNumber === 0) {
				setMoviesNumber(12);
			} else {
			}
			setCounterAddMovies(3);
		} else if (display >= 768) {
			if (moviesNumber === 0) {
				setMoviesNumber(8);
			}

			setCounterAddMovies(2);
		} else if (display >= 320 && display <= 480) {
			if (moviesNumber === 0) {
				setMoviesNumber(5);
			}
			setCounterAddMovies(2);
		}
	}

	useEffect(() => {
		displayWidthCheck(window.screen.width);
	}, [display]);

	function handleClickAddMoreMovies() {
		setMoviesNumber(moviesNumber + counterAddMovies);
	}

	return (
		<div className='movies-list'>
			{films.length ? (
				<ul className='movies-list__container'>
					{films.slice(0, moviesNumber).map((film) => (
						<MoviesCard
							film={film}
							key={film.id || film.movieId}
							isAllMovies={isAllMovies}
							isSavedMovies={isSavedMovies}
							handleSaveLikedMovie={handleSaveLikedMovie}
							onDeleteMovie={onDeleteMovie}
							handleIsLike={handleIsLike}
							likedMovies={likedMovies}
						/>
					))}
				</ul>
			) : (
				<p className='movies-list__no-films-searched'>Мы ничего не нашли по вашему запросу.</p>
			)}

			{isMoreButton && films.length > moviesNumber && (
				<button
					className='movies-list_add-button'
					type='button'
					aria-label='Загрузить больше фильмов'
					onClick={handleClickAddMoreMovies}
				>
					Ещё
				</button>
			)}
		</div>
	);
}

export default MoviesCardList;
