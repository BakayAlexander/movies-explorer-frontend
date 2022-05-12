import React, { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({
	onChangeFilterValue,
	onChangeShortMoviesCheckbox,
	isShortMoviesChecked,
	previouslyFilterValue,
	isDisabledButton,
}) {
	const [movie, setMovie] = useState(previouslyFilterValue || '');
	const [errorValidationMovie, setErorValidationMovie] = useState('');

	function handleChangeMovie(e) {
		setMovie(e.target.value);
		if (e.target.value.length !== 0) {
			setErorValidationMovie('');
		}
	}

	function handleFindMovies(e) {
		if (!isDisabledButton) {
			e.preventDefault();
			if (movie.length === 0 || movie.trim().length === 0) {
				return setErorValidationMovie('Нужно ввести ключевое слово');
			}
			onChangeFilterValue(movie);
		}
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
					placeholder='Название фильма'
					disabled={isDisabledButton}
				/>

				<button className='search__form-button' disabled={isDisabledButton}></button>
			</form>
			{errorValidationMovie && (
				<span className='search__form-error' id='name-input-error'>
					{errorValidationMovie}
				</span>
			)}

			<FilterCheckbox
				onChangeShortMoviesCheckbox={onChangeShortMoviesCheckbox}
				isShortMoviesChecked={isShortMoviesChecked}
			/>
			<hr className='search__decoration-line' />
		</section>
	);
}

export default SearchForm;
