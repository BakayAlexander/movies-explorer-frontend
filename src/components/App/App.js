import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { data } from '../../utils/data';
import { getMovies } from '../../utils/Api/MoviesApi';
import ErrorModal from '../ErrorModal/ErrorModal';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import { SHORT_MOVIE_DURATION } from '../../utils/config';

function App() {
	const [allMovies, setAllMovies] = useState([]);
	const [isApiError, setIsApiError] = useState(false);
	const [errorData, setErrorData] = useState('');
	const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
	const [isLiked, setIsLiked] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [filterValue, setFilterValue] = useState('');
	const [isShortMoviesChecked, setIsShortMoviesChecked] = useState(false);
	const [filtredMovies, setFiltredMovies] = useState([]);

	useEffect(() => {
		getMovies()
			.then((movies) => {
				setAllMovies(movies);
				setIsLoading(false);
				setIsApiError(false);
				if (filterValue) {
					const result = movies.filter((movie) => {
						return movie.nameRU.toLowerCase().includes(filterValue.toLowerCase().trim());
					});
					if (isShortMoviesChecked) {
						return setFiltredMovies(filterShortMovies(result));
					}
					return setFiltredMovies(result);
				}
			})
			.catch((err) => {
				setIsApiError(true);
				setErrorData(err);
				setIsErrorModalOpen(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [filterValue]);

	function handleCloseModal() {
		setIsErrorModalOpen(false);
	}

	function handleChangeFilterValue(searchInputValue) {
		setFilterValue(searchInputValue);
	}
	function handleChangeShortMoviesCheckbox() {
		setIsShortMoviesChecked(!isShortMoviesChecked);
	}

	function filterShortMovies(arr) {
		if (arr.length !== 0 || arr !== 'undefined') {
			return arr.filter((movie) => {
				return movie.duration <= SHORT_MOVIE_DURATION;
			});
		}
	}

	function handleCardLike(id, isLiked) {}

	const films = data;
	return (
		<div className='page'>
			<Switch>
				<Route exact path='/'>
					<Main />
				</Route>
				<Route exact path='/movies'>
					<Movies
						// films={allMovies}
						films={filtredMovies}
						isLoading={isLoading}
						isApiError={isApiError}
						isErrorModalOpen={isErrorModalOpen}
						errorData={errorData}
						onCloseModal={handleCloseModal}
						onChangeFilterValue={handleChangeFilterValue}
						onChangeShortMoviesCheckbox={handleChangeShortMoviesCheckbox}
						isShortMoviesChecked={isShortMoviesChecked}
					/>
				</Route>
				<Route exact path='/saved-movies'>
					<SavedMovies films={films} />
				</Route>
				<Route exact path='/profile'>
					<Profile />
				</Route>
				<Route exact path='/signup'>
					<Register />
				</Route>
				<Route exact path='/signin'>
					<Login />
				</Route>
				<Route exact path='*'>
					<NotFound />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
