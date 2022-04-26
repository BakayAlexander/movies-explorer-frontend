import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ films, ...props }) {
	return (
		<div className='movies-list'>
			<ul className='movies-list__container'>
				{films.map((film) => (
					<MoviesCard
						key={film.id}
						id={film.id}
						name={film.nameRU}
						duration={film.duration}
						image={film.image.url}
						alt={film.image.name}
						{...film}
					/>
				))}
			</ul>
			<button className='movies-list_add-button' type='button' aria-label='Загрузить больше фильмов'>
				Ещё
			</button>
		</div>
	);
}

export default MoviesCardList;