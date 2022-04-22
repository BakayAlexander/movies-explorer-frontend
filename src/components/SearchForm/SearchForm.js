import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
	const [movie, setMovie] = React.useState('');

	function handleChangeMovie(e) {
		setMovie(e.target.value);
	}

	return (
		<section className='search'>
			<form className='search__form'>
				<input
					className='search__form-input'
					id='movie'
					placeholder='Фильм'
					type='text'
					name='movie'
					value={movie ?? ''}
					onChange={handleChangeMovie}
					required
				/>
				<button className='search__form-button'></button>
			</form>
			<FilterCheckbox />
		</section>
	);
}

export default SearchForm;
