import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ films, isLikeButton, isDeleteButton, isMoreButton, ...props }) {
	return (
		<div className='movies-list'>
			<ul className='movies-list__container'>
				{films.map((film) => (
					<MoviesCard
						isLikeButton={isLikeButton}
						isDeleteButton={isDeleteButton}
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
			{isMoreButton && (
				<button className='movies-list_add-button' type='button' aria-label='Загрузить больше фильмов'>
					Ещё
				</button>
			)}
		</div>
	);
}

export default MoviesCardList;
