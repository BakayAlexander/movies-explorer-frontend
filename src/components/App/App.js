import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
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
import { checkToken, login, register } from '../../utils/Api/Auth';
import { updateUserProfile } from '../../utils/Api/MainApi';

function App() {
	const history = useHistory();
	const [currentUser, setCurrentUser] = useState({});
	const [allMovies, setAllMovies] = useState([]);
	const [isApiError, setIsApiError] = useState(false);
	const [errorData, setErrorData] = useState('');
	const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
	const [isLiked, setIsLiked] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [filterValue, setFilterValue] = useState('');
	const [isShortMoviesChecked, setIsShortMoviesChecked] = useState(false);
	const [filtredMovies, setFiltredMovies] = useState([]);
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	const [isUpdateUserPopupOpen, setIsUpdateUserPopupOpen] = useState(false);

	function handleRegisterNewUser(name, email, password) {
		register(name, email, password).then((res) => {
			history.push('/signin');
		});
	}

	function handleLoginUser(email, password) {
		login(email, password).then((res) => {
			if (res.token) {
				checkToken(res.token).then((res) => {
					setIsUserLoggedIn(true);
					setCurrentUser(res);
					setIsUserLoggedIn(true);
					history.push('/movies');
				});
			}
		});
	}

	function handleLogoutUser() {
		localStorage.removeItem('jwt');
		setIsUserLoggedIn(false);
		// localStorage.removeItem('userMovies');
		// localStorage.removeItem('movies');
		// localStorage.removeItem('sortedMovies');
		// localStorage.removeItem('currentUser');
		// setUserMovies([]);
		// setSortedMovies([]);
		// setCurrentUser({});
		// setLoggedIn(false);
		// setMessage('');
		history.push('/');
	}

	useEffect(() => {
		if (localStorage.getItem('jwt')) {
			const token = localStorage.getItem('jwt');
			checkToken(token).then((res) => {
				setCurrentUser(res);
				setIsUserLoggedIn(true);
				history.push('/movies');
			});
		}
	}, []);

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
		setIsUpdateUserPopupOpen(false);
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

	function handleUpdateUserButtonClick() {
		setIsUpdateUserPopupOpen(!isUpdateUserPopupOpen);
	}

	function handleUpdateUserSubmit(email, name) {
		updateUserProfile(email, name)
			.then(() => setCurrentUser({ name, email }))
			.catch((err) => {
				setErrorData(err);
				setIsErrorModalOpen(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	function handleCardLike(id, isLiked) {}

	const films = data;
	return (
		<div className='page'>
			<CurrentUserContext.Provider value={currentUser}>
				<Switch>
					<Route exact path='/'>
						<Main isUserLoggedIn={isUserLoggedIn} />
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
							isUserLoggedIn={isUserLoggedIn}
						/>
					</Route>
					<Route exact path='/saved-movies'>
						<SavedMovies films={films} isUserLoggedIn={isUserLoggedIn} />
					</Route>
					<Route exact path='/profile'>
						<Profile
							isUserLoggedIn={isUserLoggedIn}
							isUpdateUserPopupOpen={isUpdateUserPopupOpen}
							onOpenModal={handleUpdateUserButtonClick}
							onCloseModal={handleCloseModal}
							onUpdateUser={handleUpdateUserSubmit}
							isErrorModalOpen={isErrorModalOpen}
							errorData={errorData}
							onLogout={handleLogoutUser}
							isLoading={isLoading}
						/>
					</Route>
					<Route exact path='/signup'>
						<Register onRegister={handleRegisterNewUser} />
					</Route>
					<Route exact path='/signin'>
						<Login onLogin={handleLoginUser} />
					</Route>
					<Route exact path='*'>
						<NotFound />
					</Route>
				</Switch>
			</CurrentUserContext.Provider>
		</div>
	);
}

export default App;
