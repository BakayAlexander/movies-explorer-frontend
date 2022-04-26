import React from 'react';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';

function Movies(props) {
	const staticFilms = props.films.slice(0, 12);
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

export default Movies;
