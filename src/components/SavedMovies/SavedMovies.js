import React from 'react';
import Footer from '../Footer/Footer';
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
				<MoviesCardList films={staticFilms} isMoreButton={false} isLikeButton={false} isDeleteButton={true} />
			</section>
			<Footer />
		</>
	);
}

export default SavedMovies;
