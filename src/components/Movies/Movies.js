import React from 'react';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies(props) {
	const staticFilms = props.films.slice(0, 12);
	return (
		<>
			<Header className='movies' />
			<section>
				<SearchForm />
				{/* <Preloader /> */}
				<MoviesCardList films={staticFilms} isMoreButton={true} isLikeButton={true} isDeleteButton={false} />
			</section>
			<Footer />
		</>
	);
}

export default Movies;
