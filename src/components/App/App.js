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
	const [filtredLikedMovies, setFiltredLikedMovies] = useState([]);
	const [isApiError, setIsApiError] = useState(false);
	const [errorData, setErrorData] = useState('');
	const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [filterValue, setFilterValue] = useState('');
	const [filterValueLikedMovies, setFilterValueLikedMovies] = useState('');
	const [isShortMoviesChecked, setIsShortMoviesChecked] = useState(isShortMoviesPreviouslyChecked || false);
	const [isShortLikedMoviesChecked, setIsShortLikedMoviesChecked] = useState(false);
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	const [isUpdateUserPopupOpen, setIsUpdateUserPopupOpen] = useState(false);
	const [isDisabledButton, setIsDisabledButton] = useState(false);

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
		Promise.all([getLikedMovies(), getMovies()])
			.then(([likedMoviesData, allMoviesData]) => {
				setLikedMovies(likedMoviesData);
				setAllMovies(allMoviesData);
				setFiltredLikedMovies(likedMoviesData);
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
						setFiltredLikedMovies(likedMoviesData);
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

	// * Filtering movies by useEffect on changing value and isShortMoviesChecked
	useEffect(() => {
		if (filterValue) {
			const result = allMovies.filter((movie) => {
				return movie.nameRU.toLowerCase().includes(filterValue.toLowerCase().trim());
			});
			localStorage.setItem('previouslySearchedMovies', JSON.stringify(result));
			localStorage.setItem('previouslyFilterValue', JSON.stringify(filterValue));
			setFiltredMovies(result);
		}
		setIsDisabledButton(false);
	}, [filterValue, isShortMoviesChecked]);

	useEffect(() => {
		if (filterValueLikedMovies) {
			const result = likedMovies.filter((movie) => {
				return movie.nameRU.toLowerCase().includes(filterValueLikedMovies.toLowerCase().trim());
			});

			setFiltredLikedMovies(result);
		}
		setIsDisabledButton(false);
	}, [filterValueLikedMovies, isShortLikedMoviesChecked]);

	function handleCloseModal() {
		setIsErrorModalOpen(false);
		setIsUpdateUserPopupOpen(false);
	}

	function handleChangeFilterValue(searchInputValue) {
		setIsDisabledButton(true);
		setFilterValue(searchInputValue);
	}

	function handleChangeFilterValueLikedFilms(searchInputValueLikedFilms) {
		setIsDisabledButton(true);
		setFilterValueLikedMovies(searchInputValueLikedFilms);
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
		setIsDisabledButton(true);
		updateUserProfile(email, name)
			.then(() => setCurrentUser({ name, email }))
			.catch((err) => {
				setErrorData(err);
				setIsErrorModalOpen(true);
			})
			.finally(() => {
				setIsLoading(false);
				setIsDisabledButton(false);
			});
	}

	// * When like is added we  don't send request to MainApi,  but pushing new movies to existing array of likedMovies/filtredLikedMovies
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
		setIsDisabledButton(true);
		saveLikedMovieApi(country, director, duration, year, description, image, trailerLink, thumbnail, id, nameRU, nameEN)
			.then((res) => {
				likedMovies.push(res);
				setLikedMovies(likedMovies);
				setFiltredLikedMovies(likedMovies);
				setIsDisabledButton(false);
			})
			.catch((err) => {
				setIsApiError(true);
				setErrorData(err);
				setIsErrorModalOpen(true);
			});
	}

	// * Depending of where we now (Movies or SavedMovies) we transfer an id or an _id. And then deleting movie from MainApi and filtering array of likedMovies.
	function deleteLikedMovie(_id, id) {
		setIsDisabledButton(true);
		if (_id) {
			deleteLikedMovieApi(_id)
				.then((res) => {
					const filtred = likedMovies.filter((likedMovie) => likedMovie._id !== res._id);
					setLikedMovies(filtred);
					setFiltredLikedMovies(filtred);
					setIsDisabledButton(false);
				})
				.catch((err) => {
					setIsApiError(true);
					setErrorData(err);
					setIsErrorModalOpen(true);
				});
		} else if (id) {
			setIsDisabledButton(true);
			const selectedMovie = likedMovies.find((item) => item.movieId === id);
			setLikedMovies(likedMovies.filter((item) => item.movieId !== id));
			setFiltredLikedMovies(likedMovies.filter((item) => item.movieId !== id));
			if (selectedMovie) {
				deleteLikedMovieApi(selectedMovie._id).finally(() => {
					setIsDisabledButton(false);
				});
			} else {
				setTimeout(setIsDisabledButton(false), 1000);
			}
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
						isDisabledButton={isDisabledButton}
					/>

					<ProtectedRoute
						exact
						path='/saved-movies'
						component={SavedMovies}
						films={filterShortLikedMovies(filtredLikedMovies)}
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
						isDisabledButton={isDisabledButton}
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
						isDisabledButton={isDisabledButton}
					/>
					{/* If user loggedin exist user aren't allowed to go to Register or Login */}
					<Route exact path='/signup'>
						{!isUserLoggedIn ? (
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
						{!isUserLoggedIn ? (
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
