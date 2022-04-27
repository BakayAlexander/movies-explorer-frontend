import React from 'react';
import './ErrorModal.css';

function ErrorModal({ isOpen, onClose, ...props }) {
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
				<h1 className='error-modal__status'>409</h1>
				<p className='error-modal__message'>Что-то пошло не так</p>
			</div>
		</div>
	);
}

export default ErrorModal;
