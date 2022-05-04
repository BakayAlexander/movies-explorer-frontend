import { MOVIES_URL } from '../config';

const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

const prepareDate = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(res.status);
};

export const getMovies = () => {
	return fetch(`${MOVIES_URL}`, { method: 'GET', headers: headers }).then((res) => prepareDate(res));
};
