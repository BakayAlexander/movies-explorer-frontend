import React from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies(props) {
	const staticFilms = props.films.slice(12, 15);
	return (
		<>
			<Header className='movies' />
			<section>
				<SearchForm />
				{/* <Preloader /> */}
				<MoviesCardList films={staticFilms} />
			</section>
		</>
	);
}

export default SavedMovies;
