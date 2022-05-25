import React from 'react';
import ErrorModal from '../ErrorModal/ErrorModal';
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
	isApiError,
	isErrorModalOpen,
	errorData,
	onCloseModal,
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
					isDisabledButton={isDisabledButton}
				/>
				{isLoading ? (
					<Preloader />
				) : !isApiError ? (
					<MoviesCardList
						films={films}
						isMoreButton={false}
						isAllMovies={false}
						isSavedMovies={true}
						onDeleteMovie={onDeleteMovie}
						handleIsLike={handleIsLike}
						isDisabledButton={isDisabledButton}
					/>
				) : (
					<h2 className='movies__api-error'>
						Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного
						и попробуйте ещё раз.
					</h2>
				)}
			</section>
			<ErrorModal isOpen={isErrorModalOpen} onClose={onCloseModal} errorData={errorData} />
			<Footer />
		</>
	);
}

export default React.memo(SavedMovies);
