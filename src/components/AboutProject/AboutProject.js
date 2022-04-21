import React from 'react';
import './AboutProject.css';

function AboutProject() {
	return (
		<section className='aboutProject'>
			<h2 className='aboutProject__title'>О проекте</h2>
			<div className='aboutProject__text-container'>
				<div className='aboutProject__text-element'>
					<h3 className='aboutProject__text-title'>Дипломный проект включал 5 этапов</h3>
					<p className='aboutProject__text-subtitle'>
						Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
					</p>
				</div>
				<div className='aboutProject__text-element'>
					<h3 className='aboutProject__text-title'>На выполнение диплома ушло 5 недель</h3>
					<p className='aboutProject__text-subtitle'>
						У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
					</p>
				</div>
			</div>
			<ul className='aboutProject__scale'>
				<li className='aboutProject__duration'>1 неделя</li>
				<li className='aboutProject__duration aboutProject__duration_frontend'>4 недели</li>
				<li className='aboutProject__dev-type'>Back-end</li>
				<li className='aboutProject__dev-type'>Front-end</li>
			</ul>
		</section>
	);
}

export default AboutProject;
