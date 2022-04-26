import React from 'react';
import './Techs.css';

function Techs() {
	return (
		<section className='techs' id='techs'>
			<div className='techs__container'>
				<h3 className='techs__title'>Технологии</h3>
				<div className='techs__text-container'>
					<div className='techs__text-element'>
						<h4 className='techs__text-title'>7 технологий</h4>
						<p className='techs__text-subtitle'>
							На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
						</p>
					</div>
					<ul className='techs__labels'>
						<li className='techs__label'>HTML</li>
						<li className='techs__label'>CSS</li>
						<li className='techs__label'>JS</li>
						<li className='techs__label'>React</li>
						<li className='techs__label'>Git</li>
						<li className='techs__label'>Express.js</li>
						<li className='techs__label'>mongoDB</li>
					</ul>
				</div>
			</div>
		</section>
	);
}

export default Techs;
