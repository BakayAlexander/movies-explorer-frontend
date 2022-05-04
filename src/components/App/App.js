import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { data } from '../../utils/data';
import ErrorModal from '../ErrorModal/ErrorModal';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
	const [isApiError, setIsApiError] = React.useState(false);
	const [isLiked, setIsLiked] = React.useState(true);
	const [isLoading, setIsLoading] = React.useState(true);

	function handleCloseModal() {
		setIsApiError(false);
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
					<Movies films={films} />
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
			<ErrorModal isOpen={isApiError} onClose={handleCloseModal} />
		</div>
	);
}

export default App;
