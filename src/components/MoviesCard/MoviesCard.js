import React from 'react';
import './MoviesCard.css';

function MoviesCard({ id, name, duration, image, alt, ...props }) {
	return (
		<li className='movies-card'>
			<img className='movies-card__image' src='https://artfiles.alphacoders.com/357/35757.jpg' alt={alt} />
			<div className='movies-card__description'>
				<div className='movies-card__text-container'>
					<h3 className='movies-card__title'>{name}</h3>
					<p className='movies-card__duration'>{duration}м</p>
				</div>
				<button className='movies-card__like-button' type='button' aria-label='Отметить понравимшимся'></button>
				<button className='movies-card__delete-button' type='button' aria-label='Удалить карточкуы'></button>
			</div>
		</li>
	);
}

export default MoviesCard;
