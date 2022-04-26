import React from 'react';
import './Footer.css';

function Footer() {
	const date = new Date();
	return (
		<footer className='footer'>
			<div className='footer__container'>
				<h3 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
				<div className='footer__links-container'>
					<p className='footer__year'> &#169; {date.getFullYear()}</p>
					<div className='footer__links'>
						<a className='footer__link' href='https://practicum.yandex.ru/' target='_blank' rel='noreferrer'>
							Яндекс.Практикум
						</a>
						<a className='footer__link' href='https://github.com/BakayAlexander' target='_blank' rel='noreferrer'>
							GitHub
						</a>
						<a
							className='footer__link'
							href='https://www.linkedin.com/in/alexander-bakay-b6b041224/'
							target='_blank'
							rel='noreferrer'
						>
							LinkedIn
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
