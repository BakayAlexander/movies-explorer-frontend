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
	isLiked,
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
					isMoreButton={false}
					isAllMovies={false}
					isSavedMovies={true}
					onDeleteMovie={onDeleteMovie}
					isLiked={isLiked}
					handleIsLike={handleIsLike}
				/>
			</section>
			<Footer />
		</>
	);
}

export default SavedMovies;
