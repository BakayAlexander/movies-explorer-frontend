import React from 'react';
import './AboutMe.css';
import profileImage from '../../images/profile.png';

function AboutMe() {
	return (
		<section className='about-me' id='about-me'>
			<h2 className='about-me__title'>Студент</h2>
			<div className='about-me__content-container'>
				<div className='about-me__text-element'>
					<h3 className='about-me__text-title'>Александр</h3>
					<p className='about-me__text-subtitle'>Фронтенд-разработчик, 29 лет</p>
					<p className='about-me__text'>
						Я родился в маленьком городе Таганроге. Там же закончил ЮФУ по специальности "Нанотехнология". Поработать по
						специальности не удалось, сразу после университета начал заниматься бизнесом. Пробовал себя в
						образовательных проектах, в сфере гостепреимства и услуг, но, не смотря на успехи, меня всегда тянуло в
						сторону IT. В конце концов я решил попробовать себя в веб-разработке и начал обучение в Яндекс Практикуме, а
						через полгода я продал свой вполне успешный бизнес и в очередной раз мигрировал в другой город. Не
						становитесь разработчиками, это опасно для любой вашей другой карьеры. Шучу, конечно. Все здесь здорово и
						люди потрясающие.
					</p>
					<ul className='about-me__links'>
						<li>
							<a
								className='about-me__link'
								href='https://www.linkedin.com/in/alexander-bakay-b6b041224/'
								target='_blank'
								rel='noreferrer'
							>
								Linkedin
							</a>
						</li>
						<li>
							<a className='about-me__link' href='https://github.com/BakayAlexander' target='_blank' rel='noreferrer'>
								Github
							</a>
						</li>
					</ul>
				</div>
				<img className='about-me__photo' src={profileImage} alt='Фото Александра' />
			</div>
		</section>
	);
}

export default AboutMe;
