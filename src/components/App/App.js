import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
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
import { deleteLikedMovieApi, getLikedMovies, saveLikedMovieApi, updateUserProfile } from '../../utils/Api/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { useLocation } from 'react-router-dom';

function App() {
	const history = useHistory();
	const currentPath = useLocation();
	const previouslyFilterValue = JSON.parse(localStorage.getItem('previouslyFilterValue'));
	const previouslySearchedMovies = JSON.parse(localStorage.getItem('previouslySearchedMovies'));
	const isShortMoviesPreviouslyChecked = JSON.parse(localStorage.getItem('isShortMoviesPreviouslyChecked'));
	const [currentUser, setCurrentUser] = useState({});
	const [allMovies, setAllMovies] = useState([]);
	const [isApiError, setIsApiError] = useState(false);
	const [errorData, setErrorData] = useState('');
	const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
	const [likedMovies, setLikedMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [filterValue, setFilterValue] = useState('');
	const [isShortMoviesChecked, setIsShortMoviesChecked] = useState(isShortMoviesPreviouslyChecked || false);
	const [isShortLikedMoviesChecked, setIsShortLikedMoviesChecked] = useState(false);
	const [filtredMovies, setFiltredMovies] = useState(previouslySearchedMovies || []);
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
		localStorage.removeItem('previouslyFilterValue');
		localStorage.removeItem('previouslySearchedMovies');
		setIsUserLoggedIn(false);
		history.push('/');
	}

	useEffect(() => {
		const path = currentPath.pathname;
		if (localStorage.getItem('jwt')) {
			const token = localStorage.getItem('jwt');
			checkToken(token).then((res) => {
				setCurrentUser(res);
				setIsUserLoggedIn(true);
				history.push(path);
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
					localStorage.setItem('previouslySearchedMovies', JSON.stringify(result));
					localStorage.setItem('previouslyFilterValue', JSON.stringify(filterValue));
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
	}, [filterValue, isShortMoviesChecked]);

	useEffect(() => {
		getLikedMovies().then((res) => setLikedMovies(res));
	}, [currentUser]);

	function handleCloseModal() {
		setIsErrorModalOpen(false);
		setIsUpdateUserPopupOpen(false);
	}

	function handleChangeFilterValue(searchInputValue) {
		setFilterValue(searchInputValue);
	}

	function handleChangeFilterValueLikedFilms(searchInputValue) {
		if (searchInputValue) {
			const result = likedMovies.filter((movies) => {
				return movies.nameRU.toLowerCase().includes(searchInputValue.toLowerCase());
			});
			return setLikedMovies(result);
		}
	}

	function handleChangeShortMoviesCheckbox() {
		setIsShortMoviesChecked(!isShortMoviesChecked);
	}

	function handleChangeShortMoviesCheckboxLikedFilms() {
		setIsShortLikedMoviesChecked(!isShortLikedMoviesChecked);
	}

	function filterShortMovies(arr) {
		if (isShortMoviesChecked) {
			localStorage.setItem('isShortMoviesPreviouslyChecked', JSON.stringify(isShortMoviesChecked));
		} else {
			localStorage.setItem('isShortMoviesPreviouslyChecked', false);
		}
		if (arr.length !== 0 || arr !== 'undefined') {
			return arr.filter((movie) => (isShortMoviesChecked ? movie.duration <= SHORT_MOVIE_DURATION : true));
		}
	}

	function filterShortLikedMovies(arr) {
		if (arr.length !== 0 || arr !== 'undefined') {
			return arr.filter((movie) => (isShortLikedMoviesChecked ? movie.duration <= SHORT_MOVIE_DURATION : true));
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

	function handleSaveLikedMovie(
		country,
		director,
		duration,
		year,
		description,
		image,
		trailerLink,
		thumbnail,
		id,
		nameRU,
		nameEN
	) {
		saveLikedMovieApi(
			country,
			director,
			duration,
			year,
			description,
			image,
			trailerLink,
			thumbnail,
			id,
			nameRU,
			nameEN
		);
		getLikedMovies().then((res) => setLikedMovies(res));
	}

	function deleteLikedMovie(_id, id) {
		if (_id) {
			deleteLikedMovieApi(_id).then((res) => {
				setLikedMovies(likedMovies.filter((likedMovie) => likedMovie._id !== res._id));
			});
		} else if (id) {
			const selectedMovie = likedMovies.find((item) => item.movieId === id);
			deleteLikedMovie(selectedMovie._id);
		}
	}

	return (
		<div className='page'>
			<CurrentUserContext.Provider value={currentUser}>
				<Switch>
					<Route exact path='/'>
						<Main isUserLoggedIn={isUserLoggedIn} />
					</Route>
					<ProtectedRoute
						exact
						path='/movies'
						component={Movies}
						isUserLoggedIn={isUserLoggedIn}
						films={filterShortMovies(filtredMovies)}
						likedMovies={likedMovies}
						allMovies={allMovies}
						isLoading={isLoading}
						isApiError={isApiError}
						isErrorModalOpen={isErrorModalOpen}
						errorData={errorData}
						onCloseModal={handleCloseModal}
						onChangeFilterValue={handleChangeFilterValue}
						onChangeShortMoviesCheckbox={handleChangeShortMoviesCheckbox}
						isShortMoviesChecked={isShortMoviesChecked}
						handleSaveLikedMovie={handleSaveLikedMovie}
						onDeleteMovie={deleteLikedMovie}
						previouslyFilterValue={previouslyFilterValue}
					/>

					<ProtectedRoute
						exact
						path='/saved-movies'
						component={SavedMovies}
						films={filterShortLikedMovies(likedMovies)}
						isUserLoggedIn={isUserLoggedIn}
						onDeleteMovie={deleteLikedMovie}
						onChangeFilterValue={handleChangeFilterValueLikedFilms}
						onChangeShortMoviesCheckbox={handleChangeShortMoviesCheckboxLikedFilms}
						isShortMoviesChecked={isShortLikedMoviesChecked}
					/>
					<ProtectedRoute
						exact
						path='/profile'
						component={Profile}
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
