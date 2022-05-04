import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ films, isLikeButton, isDeleteButton, isMoreButton }) {
	const [moviesNumber, setMoviesNumber] = useState(3);
	const [counterAddMovies, setCounterAddMovies] = useState(0);

	const display = window.screen.width;

	function displayWidthCheck(display) {
		if (display >= 1280) {
			setMoviesNumber(12);
			setCounterAddMovies(3);
		} else if (display >= 768) {
			setMoviesNumber(8);
			setCounterAddMovies(2);
		} else if (display >= 320) {
			setMoviesNumber(5);
			setCounterAddMovies(2);
		}
	}

	useEffect(() => {
		displayWidthCheck(display);
	}, [display]);

	// window.addEventListener('resize', () => {
	// 	setTimeout(displayWidthCheck(display), 2000);
	// });

	function handleClickAddMoreMovies() {
		setMoviesNumber(moviesNumber + counterAddMovies);
	}

	console.log(films);

	return (
		<div className='movies-list'>
			{films.length ? (
				<ul className='movies-list__container'>
					{films.slice(0, moviesNumber).map((film) => (
						<MoviesCard
							isLikeButton={isLikeButton}
							isDeleteButton={isDeleteButton}
							key={film.id}
							id={film.id}
							name={film.nameRU}
							duration={film.duration}
							image={film.image.url}
							alt={film.image.name}
						/>
					))}
				</ul>
			) : (
				<p className='movies-list__no-films-searched'>Мы ничего не нашли по вашему запросу.</p>
			)}

			{isMoreButton && films.length >= moviesNumber && (
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
