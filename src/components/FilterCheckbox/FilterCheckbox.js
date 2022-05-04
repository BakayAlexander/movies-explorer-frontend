import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ onChangeShortMoviesCheckbox, isShortMoviesChecked }) {
	return (
		<div className='checkbox'>
			<label className='checkbox__container'>
				<input
					className='checkbox__input'
					type='checkbox'
					name='short-movies'
					id='short-movies'
					checked={isShortMoviesChecked}
					onChange={onChangeShortMoviesCheckbox}
				/>
				<span className='checkbox__input-check'></span>
				Короткометражки
			</label>
		</div>
	);
}

export default FilterCheckbox;
