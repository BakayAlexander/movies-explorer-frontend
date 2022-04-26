import { Switch, Route, useHistory } from 'react-router-dom';
import { data } from '../../utils/data';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import './App.css';

function App() {
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
		</div>
	);
}

export default App;
