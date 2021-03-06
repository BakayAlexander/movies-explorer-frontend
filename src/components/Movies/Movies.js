import React from 'react';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ErrorModal from '../ErrorModal/ErrorModal';
import './Movies.css';

function Movies({
	films,
	isLoading,
	isApiError,
	isErrorModalOpen,
	errorData,
	onCloseModal,
	onChangeFilterValue,
	allMovies,
	onChangeShortMoviesCheckbox,
	isShortMoviesChecked,
	isUserLoggedIn,
	handleSaveLikedMovie,
	onDeleteMovie,
	likedMovies,
	previouslyFilterValue,
	isDisabledButton,
}) {
	return (
		<>
			<Header isUserLoggedIn={isUserLoggedIn} />
			<section>
				<SearchForm
					onChangeFilterValue={onChangeFilterValue}
					onChangeShortMoviesCheckbox={onChangeShortMoviesCheckbox}
					isShortMoviesChecked={isShortMoviesChecked}
					previouslyFilterValue={previouslyFilterValue}
					isDisabledButton={isDisabledButton}
				/>
				{isLoading ? (
					<Preloader />
				) : !isApiError ? (
					<MoviesCardList
						films={films}
						likedMovies={likedMovies}
						isMoreButton={true}
						isAllMovies={true}
						isSavedMovies={false}
						allMovies={allMovies}
						handleSaveLikedMovie={handleSaveLikedMovie}
						onDeleteMovie={onDeleteMovie}
						isDisabledButton={isDisabledButton}
					/>
				) : (
					<h2 className='movies__api-error'>
						Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного
						и попробуйте ещё раз.
					</h2>
				)}
			</section>
			<Footer />
			<ErrorModal isOpen={isErrorModalOpen} onClose={onCloseModal} errorData={errorData} />
		</>
	);
}

export default React.memo(Movies);
