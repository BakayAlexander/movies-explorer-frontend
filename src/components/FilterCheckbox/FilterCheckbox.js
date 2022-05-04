import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
	return (
		<div className='checkbox'>
			<label className='checkbox__container'>
				<input className='checkbox__input' type='checkbox' name='short-movies' id='short-movies' />
				<span className='checkbox__input-check'></span>
				Короткометражки
			</label>
		</div>
	);
}

export default FilterCheckbox;
