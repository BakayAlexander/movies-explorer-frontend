import React, { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({ onChangeFilterValue, onChangeShortMoviesCheckbox, isShortMoviesChecked, previouslyFilterValue }) {
	const [movie, setMovie] = useState(previouslyFilterValue || '');

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
			<FilterCheckbox
				onChangeShortMoviesCheckbox={onChangeShortMoviesCheckbox}
				isShortMoviesChecked={isShortMoviesChecked}
			/>
			<hr className='search__decoration-line' />
		</section>
	);
}

export default SearchForm;
