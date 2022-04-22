import React from 'react';
import './AboutMe.css';
import profileImage from '../../images/profile.png';

function AboutMe() {
	return (
		<section className='aboutMe'>
			<h2 className='aboutMe__title'>Студент</h2>
			<div className='aboutMe__content-container'>
				<div className='aboutMe__text-element'>
					<h3 className='aboutMe__text-title'>Александр</h3>
					<p className='aboutMe__text-subtitle'>Фронтенд-разработчик, 29 лет</p>
					<p className='aboutMe__text'>
						Я родился в маленьком городе Таганроге. Там же закончил ЮФУ по специальности "Нанотехнология". Поработать по
						специальности не удалось, сразу после университета начал заниматься бизнесом. Пробовал себя в
						образовательных проектах, в сфере гостепреимства и услуг, но, не смотря на успехи, меня всегда тянуло в
						сторону IT. В конце концов я решил попробовать себя в веб-разработке и начал обучение в Яндекс Практикуме, а
						через полгода я продал свой вполне успешный бизнес и в очередной раз мигрировал в другой город. Не
						становитесь разработчиками, это опасно для любой вашей другой карьеры. Шучу, конечно. Все здесь здорово и
						люди потрясающие.
					</p>
					<ul className='aboutMe__links'>
						<li>
							<a
								className='aboutMe__link'
								href='https://www.linkedin.com/in/alexander-bakay-b6b041224/'
								target='_blank'
								rel='noreferrer'
							>
								Linkedin
							</a>
						</li>
						<li>
							<a className='aboutMe__link' href='https://github.com/BakayAlexander' target='_blank' rel='noreferrer'>
								Github
							</a>
						</li>
					</ul>
				</div>
				<img className='aboutMe__photo' src={profileImage} alt='Фото Александра' />
			</div>
		</section>
	);
}

export default AboutMe;
