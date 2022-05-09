import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies({
	films,
	isLoading,
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
				{isLoading ? (
					<Preloader />
				) : (
					<MoviesCardList
						films={films}
						isMoreButton={false}
						isAllMovies={false}
						isSavedMovies={true}
						onDeleteMovie={onDeleteMovie}
						handleIsLike={handleIsLike}
					/>
				)}
			</section>
			<Footer />
		</>
	);
}

export default SavedMovies;
