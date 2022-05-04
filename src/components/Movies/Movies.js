import React from 'react';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ErrorModal from '../ErrorModal/ErrorModal';
import './Movies.css';

function Movies({ films, isLoading, isApiError, isErrorModalOpen, errorData, onCloseModal, onChangeFilterValue }) {
	return (
		<>
			<Header className='movies' />
			<section>
				<SearchForm onChangeFilterValue={onChangeFilterValue} />
				{isLoading ? (
					<Preloader />
				) : !isApiError ? (
					<MoviesCardList films={films} isMoreButton={true} isLikeButton={true} isDeleteButton={false} />
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

export default Movies;
