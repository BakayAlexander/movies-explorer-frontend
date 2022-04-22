import React from 'react';
import './Portfolio.css';

function Portfolio() {
	return (
		<section className='portfolio'>
			<h2 className='portfolio__title'>Портфолио</h2>
			<ul className='portfolio__links'>
				<li className='portfolio__link-container'>
					<a
						className='portfolio__link'
						href='https://bakayalexander.github.io/balaklava-project/'
						target='_blank'
						rel='noreferrer'
					>
						Статичный сайт
					</a>
					<div className='portfolio__link-icon'></div>
				</li>
				<li className='portfolio__link-container'>
					<a
						className='portfolio__link'
						href='https://bakayalexander.github.io/russian-travel/'
						target='_blank'
						rel='noreferrer'
					>
						Адаптивный сайт
					</a>
					<div className='portfolio__link-icon'></div>
				</li>
				<li className='portfolio__link-container'>
					<a
						className='portfolio__link'
						href='https://bakayalexander.github.io/blog-react/'
						target='_blank'
						rel='noreferrer'
					>
						Роутинг, маршрутизация и api
					</a>
					<div className='portfolio__link-icon'></div>
				</li>
				<li className='portfolio__link-container'>
					<a
						className='portfolio__link portfolio__link_without-border'
						href='https://bakayalexander.github.io/react-mesto-auth/'
						target='_blank'
						rel='noreferrer'
					>
						Одностраничное приложение
					</a>
					<div className='portfolio__link-icon'></div>
				</li>
			</ul>
		</section>
	);
}

export default Portfolio;
