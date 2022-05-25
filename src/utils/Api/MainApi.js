import { BASE_URL } from '../config';

// !!!Never done like this
// const headers = {
// 	Authorization: `Bearer ${localStorage.getItem('jwt')}`,
// 	'Content-Type': 'application/json',
// 	Accept: 'application/json',
// };

const prepareDate = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(res.status);
};

export const getUserProfile = (token) => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	}).then(prepareDate);
};

export const updateUserProfile = (email, name) => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'PATCH',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify({ name: name, email: email }),
	}).then(prepareDate);
};

export const getLikedMovies = () => {
	return fetch(`${BASE_URL}/movies`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	}).then(prepareDate);
};

export const saveLikedMovieApi = (
	country,
	director,
	duration,
	year,
	description,
	image,
	trailerLink,
	thumbnail,
	movieId,
	nameRU,
	nameEN
) => {
	return fetch(`${BASE_URL}/movies`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify({
			country,
			director,
			duration,
			year,
			description,
			image,
			trailerLink,
			thumbnail,
			movieId,
			nameRU,
			nameEN,
		}),
	}).then(prepareDate);
};

export const deleteLikedMovieApi = (id) => {
	return fetch(`${BASE_URL}/movies/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	}).then(prepareDate);
};
