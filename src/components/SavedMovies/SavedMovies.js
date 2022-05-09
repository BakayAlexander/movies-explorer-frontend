import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies({
	films,
	isUserLoggedIn,
	onDeleteMovie,
	handleIsLike,
	onChangeFilterValue,
	onChangeShortMoviesCheckbox,
	isShortMoviesChecked,
}) {
	return (
		<>
			<Header isUserLoggedIn={isUserLoggedIn} />
			<section>
				<SearchForm
					onChangeFilterValue={onChangeFilterValue}
					onChangeShortMoviesCheckbox={onChangeShortMoviesCheckbox}
					isShortMoviesChecked={isShortMoviesChecked}
				/>
				{/* <Preloader /> */}
				<MoviesCardList
					films={films}
					isMoreButton={true}
					isAllMovies={false}
					isSavedMovies={true}
					onDeleteMovie={onDeleteMovie}
					handleIsLike={handleIsLike}
				/>
			</section>
			<Footer />
		</>
	);
}

export default SavedMovies;
