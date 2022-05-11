import React from 'react';
import './ErrorModal.css';

function ErrorModal({ isOpen, onClose, errorData }) {
	let errorName = '';
	if (errorData === 400) {
		errorName = 'Ошибка валидации данных';
	} else if (errorData === 401) {
		errorName = 'Ошибка авторизации.';
	} else if (errorData === 403) {
		errorData = 'Доступ запрещен.';
	} else if (errorData === 404) {
		errorName = 'Страница не найдена.';
	} else if (errorData === 409) {
		errorName = 'Объект с указанными данными уже существует.';
	} else if (errorData === 500) {
		errorName = 'Сервер недоступен. Попробуйте позже.';
	}

	React.useEffect(() => {
		if (!isOpen) return;
		function closeByEscape(e) {
			if (e.key === 'Escape') {
				onClose();
			}
		}
		document.addEventListener('keydown', closeByEscape);
		return () => document.removeEventListener('keydown', closeByEscape);
	}, [isOpen, onClose]);

	function handleOverlay(e) {
		if (e.target === e.currentTarget) {
			onClose();
		}
	}

	return (
		<div className={`error-modal ${isOpen ? 'error-modal_is-opened' : ''}`} onClick={handleOverlay}>
			<div className='error-modal__container'>
				<button className='error-modal__close-button' onClick={onClose} />
				<h1 className='error-modal__status'>{errorData}</h1>
				<p className='error-modal__message'> {errorName ? errorName : 'Что-то пошло не так.'}</p>
			</div>
		</div>
	);
}

export default ErrorModal;
