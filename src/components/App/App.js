import { Switch, Route, useHistory } from 'react-router-dom';
import { data } from '../../utils/data';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
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
			</Switch>
		</div>
	);
}

export default App;
