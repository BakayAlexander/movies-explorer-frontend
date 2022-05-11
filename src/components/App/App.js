import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { getMovies } from '../../utils/Api/MoviesApi';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import { SHORT_MOVIE_DURATION } from '../../utils/config';
import { checkToken, login, register } from '../../utils/Api/Auth';
import {
	deleteLikedMovieApi,
	getLikedMovies,
	getUserProfile,
	saveLikedMovieApi,
	updateUserProfile,
} from '../../utils/Api/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { useLocation } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

function App() {
	const history = useHistory();
	const currentPath = useLocation();
	const previouslyFilterValue = JSON.parse(localStorage.getItem('previouslyFilterValue'));
	const previouslySearchedMovies = JSON.parse(localStorage.getItem('previouslySearchedMovies'));
	const isShortMoviesPreviouslyChecked = JSON.parse(localStorage.getItem('isShortMoviesPreviouslyChecked'));
	const [currentUser, setCurrentUser] = useState({});
	const [allMovies, setAllMovies] = useState([]);
	const [likedMovies, setLikedMovies] = useState([]);
	const [filtredMovies, setFiltredMovies] = useState(previouslySearchedMovies || []);
	const [isApiError, setIsApiError] = useState(false);
	const [errorData, setErrorData] = useState('');
	const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [filterValue, setFilterValue] = useState('');
	const [isShortMoviesChecked, setIsShortMoviesChecked] = useState(isShortMoviesPreviouslyChecked || false);
	const [isShortLikedMoviesChecked, setIsShortLikedMoviesChecked] = useState(false);
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	const [isUpdateUserPopupOpen, setIsUpdateUserPopupOpen] = useState(false);

	// * User has token? Get user data
	useEffect(() => {
		const path = currentPath.pathname;
		if (localStorage.getItem('jwt')) {
			const token = localStorage.getItem('jwt');
			checkToken(token)
				.then((res) => {
					setCurrentUser(res);
					setIsUserLoggedIn(true);
					history.push(path);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	// * Get liked movies from MainApi
	useEffect(() => {
		setIsLoading(true);
		getLikedMovies()
			.then((res) => {
				setLikedMovies(res);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	// * When user login, we get user data, all movies and liked movies.
	function handleLoginUser(email, password) {
		login(email, password)
			.then((res) => {
				localStorage.setItem('jwt', res.token);
				Promise.all([getUserProfile(res.token), getLikedMovies(), getMovies()]).then(
					([userData, likedMoviesData, allMoviesData]) => {
						setCurrentUser(userData);
						setLikedMovies(likedMoviesData);
						setAllMovies(allMoviesData);
						setIsUserLoggedIn(true);
						history.push('/movies');
					}
				);
			})
			.catch((err) => {
				setIsApiError(true);
				setErrorData(err);
				setIsErrorModalOpen(true);
			});
	}

	// * After register we permanently login
	function handleRegisterNewUser(name, email, password) {
		register(name, email, password)
			.then(() => {
				handleLoginUser(email, password);
			})
			.catch((err) => {
				setIsApiError(true);
				setErrorData(err);
				setIsErrorModalOpen(true);
			});
	}

	function handleLogoutUser() {
		localStorage.removeItem('jwt');
		localStorage.removeItem('previouslyFilterValue');
		localStorage.removeItem('previouslySearchedMovies');
		localStorage.removeItem('isShortMoviesPreviouslyChecked');
		setIsUserLoggedIn(false);
		history.push('/');
	}

	// * Get all movies from api, than comare with filter value and return filtred array
	useEffect(() => {
		setIsLoading(true);
		getMovies()
			.then((movies) => {
				setAllMovies(movies);
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
	}, [filterValue, isShortMoviesChecked, currentUser]);

	function handleCloseModal() {
		setIsErrorModalOpen(false);
		setIsUpdateUserPopupOpen(false);
	}

	function handleChangeFilterValue(searchInputValue) {
		setFilterValue(searchInputValue);
	}

	// * Filter of liked movies
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

	// *Looking if "Short movies" checkbox checked and depending of it return filtred or unfiltered array. Than we use this functions to filter movies at Movies and SavedMovies while adding a props.
	function filterShortMovies(arr) {
		if (isShortMoviesChecked && arr.length !== 0) {
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

	// * When like is added we send request to MainApi, and after that refreshing liked movies
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
		).catch((err) => {
			setIsApiError(true);
			setErrorData(err);
			setIsErrorModalOpen(true);
		});
		getLikedMovies()
			.then((res) => setLikedMovies(res))
			.catch((err) => {
				setIsApiError(true);
				setErrorData(err);
				setIsErrorModalOpen(true);
			});
	}

	// * Depending of where we now (Movies or SavedMovies) we transfer an id or an _id. And then deleting movie from MainApi and filtering array of likedMovies.
	function deleteLikedMovie(_id, id) {
		if (_id) {
			deleteLikedMovieApi(_id)
				.then((res) => {
					setLikedMovies(likedMovies.filter((likedMovie) => likedMovie._id !== res._id));
				})
				.catch((err) => {
					setIsApiError(true);
					setErrorData(err);
					setIsErrorModalOpen(true);
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
						isLoading={isLoading}
						isApiError={isApiError}
						isErrorModalOpen={isErrorModalOpen}
						errorData={errorData}
						onCloseModal={handleCloseModal}
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
					{/* If token exist user aren't allowed to go to Register or Login */}
					<Route exact path='/signup'>
						{!localStorage.getItem('jwt') ? (
							<Register
								onRegister={handleRegisterNewUser}
								isErrorModalOpen={isErrorModalOpen}
								errorData={errorData}
								onCloseModal={handleCloseModal}
							/>
						) : (
							<Redirect to='/' />
						)}
					</Route>
					<Route exact path='/signin'>
						{!localStorage.getItem('jwt') ? (
							<Login
								onLogin={handleLoginUser}
								isErrorModalOpen={isErrorModalOpen}
								errorData={errorData}
								onCloseModal={handleCloseModal}
							/>
						) : (
							<Redirect to='/' />
						)}
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
