import React from 'react';
import './AboutProject.css';

function AboutProject() {
	return (
		<section className='aboutProject'>
			<h2 className='aboutProject__title'>О проекте</h2>
			<hr className='aboutProject__line' />
			<div className='aboutProject__text-container'>
				<div className='aboutProject__text-element'>
					<p className='aboutProject__text-title'>Дипломный проект включал 5 этапов</p>
					<p className='aboutProject__text-subtitle'>
						Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
					</p>
				</div>
				<div className='aboutProject__text-element'>
					<p className='aboutProject__text-title'>На выполнение диплома ушло 5 недель</p>
					<p className='aboutProject__text-subtitle'>
						У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
					</p>
				</div>
			</div>
		</section>
	);
}

export default AboutProject;
