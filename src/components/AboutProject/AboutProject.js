import React from 'react';
import './AboutProject.css';

function AboutProject() {
	return (
		<section className='about-project' id='about-project'>
			<h2 className='about-project__title'>О проекте</h2>
			<div className='about-project__text-container'>
				<div className='about-project__text-element'>
					<h3 className='about-project__text-title'>Дипломный проект включал 5 этапов</h3>
					<p className='about-project__text-subtitle'>
						Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
					</p>
				</div>
				<div className='about-project__text-element'>
					<h3 className='about-project__text-title'>На выполнение диплома ушло 5 недель</h3>
					<p className='about-project__text-subtitle'>
						У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
					</p>
				</div>
			</div>
			<ul className='about-project__scale'>
				<li className='about-project__duration'>1 неделя</li>
				<li className='about-project__duration about-project__duration_frontend'>4 недели</li>
				<li className='about-project__dev-type'>Back-end</li>
				<li className='about-project__dev-type'>Front-end</li>
			</ul>
		</section>
	);
}

export default AboutProject;
