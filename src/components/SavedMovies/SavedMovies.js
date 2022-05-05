import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies({ films, isUserLoggedIn, onDeleteMovie }) {
	return (
		<>
			<Header isUserLoggedIn={isUserLoggedIn} />
			<section>
				<SearchForm />
				{/* <Preloader /> */}
				<MoviesCardList
					films={films}
					isMoreButton={false}
					isLikeButton={false}
					isDeleteButton={true}
					onDeleteMovie={onDeleteMovie}
				/>
			</section>
			<Footer />
		</>
	);
}

export default SavedMovies;
