import { Switch, Route, useHistory } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import './App.css';

function App() {
	return (
		<div className='page'>
			<Switch>
				<Route exact path='/'>
					<Main />
				</Route>
				<Route exact path='/movies'>
					<Movies />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
