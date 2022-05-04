import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({ onChangeFilterValue }) {
	const [movie, setMovie] = React.useState('');

	function handleChangeMovie(e) {
		setMovie(e.target.value);
	}

	function handleFindMovies(e) {
		e.preventDefault();
		onChangeFilterValue(movie);
	}

	return (
		<section className='search'>
			<form className='search__form' onSubmit={handleFindMovies}>
				<input
					className='search__form-input'
					id='movie'
					type='text'
					name='movie'
					value={movie ?? ''}
					onChange={handleChangeMovie}
					required
					placeholder='Название фильма'
				/>
				<button className='search__form-button'></button>
			</form>
			<FilterCheckbox />
			<hr className='search__decoration-line' />
		</section>
	);
}

export default SearchForm;
