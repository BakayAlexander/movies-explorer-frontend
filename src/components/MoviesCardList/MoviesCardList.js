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
	const [renderingMovies, setRenderingMovies] = useState([]);

	useEffect(() => {
		setRenderingMovies(films);
	}, [films]);

	let display = window.screen.width;

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

	function handleClickShowAllMovies() {
		setRenderingMovies(allMovies);
	}

	return (
		<div className='movies-list'>
			{renderingMovies.length ? (
				<ul className='movies-list__container'>
					{isAllMovies && !isSavedMovies
						? renderingMovies
								.slice(0, moviesNumber)
								.map((film) => (
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
								))
						: renderingMovies.map((film) => (
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
			{isMoreButton && renderingMovies.length > moviesNumber && (
				<button
					className='movies-list_add-button'
					type='button'
					aria-label='Загрузить больше фильмов'
					onClick={handleClickAddMoreMovies}
				>
					Ещё
				</button>
			)}
			{isAllMovies && !films.length && renderingMovies.length === 0 && (
				<button
					className='movies-list_add-button'
					type='button'
					aria-label='Загрузить все фильмы'
					onClick={handleClickShowAllMovies}
				>
					Показать все фильмы
				</button>
			)}
		</div>
	);
}

export default MoviesCardList;
