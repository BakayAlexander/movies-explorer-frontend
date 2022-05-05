import { BASE_URL } from '../config';

const headers = {
	Authorization: `Bearer ${localStorage.getItem('jwt')}`,
	'Content-Type': 'application/json',
	Accept: 'application/json',
};

const prepareDate = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(res.status);
};

export const updateUserProfile = (email, name) => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'PATCH',
		headers: headers,
		body: JSON.stringify({ name: name, email: email }),
	}).then(prepareDate);
};
// export const getUserData = (token) => {
// 	return fetch(`${BASE_URL}/users/me`, {
// 		method: 'GET',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Authorization: `Bearer ${token}`,
// 		},
// 	}).then(prepareDate);
// };

// export class Api {
// 	constructor(config) {
// 		this._url = config.url;
// 		this._headers = config.headers;
// 		this._body = config.body;
// 	}

// 	_prepareDate = (res) => {
// 		if (res.ok) {
// 			return res.json();
// 		}
// 		return Promise.reject(res.status);
// 	};

// 	getProfileData() {
// 		return fetch(`${this._url}/users/me`, {
// 			headers: this._headers,
// 		}).then((res) => {
// 			return this._prepareDate(res);
// 		});
// 	}

// 	editProfile(name, about) {
// 		return fetch(`${this._url}/users/me`, {
// 			method: 'PATCH',
// 			headers: this._headers,
// 			body: JSON.stringify({
// 				name: name,
// 				about: about,
// 			}),
// 		}).then((res) => {
// 			return this._prepareDate(res);
// 		});
// 	}

// 	editAvatar(avatar) {
// 		return fetch(`${this._url}/users/me/avatar`, {
// 			method: 'PATCH',
// 			headers: this._headers,
// 			body: JSON.stringify({
// 				avatar: avatar,
// 			}),
// 		}).then((res) => {
// 			return this._prepareDate(res);
// 		});
// 	}

// 	getCardsData() {
// 		return fetch(`${this._url}/cards`, {
// 			headers: this._headers,
// 		}).then((res) => {
// 			return this._prepareDate(res);
// 		});
// 	}

// 	addNewCard(name, link) {
// 		return fetch(`${this._url}/cards`, {
// 			method: 'POST',
// 			headers: this._headers,
// 			body: JSON.stringify({
// 				name: name,
// 				link: link,
// 			}),
// 		}).then((res) => {
// 			return this._prepareDate(res);
// 		});
// 	}

// 	deleteCard(id) {
// 		return fetch(`${this._url}/cards/${id}`, {
// 			method: 'DELETE',
// 			headers: this._headers,
// 		}).then((res) => {
// 			return this._prepareDate(res);
// 		});
// 	}
// 	0;

// 	putCardLikes(id) {
// 		return fetch(`${this._url}/cards/${id}/likes`, {
// 			method: 'PUT',
// 			headers: this._headers,
// 		}).then((res) => {
// 			return this._prepareDate(res);
// 		});
// 	}

// 	deleteCardLikes(id) {
// 		return fetch(`${this._url}/cards/${id}/likes`, {
// 			method: 'DELETE',
// 			headers: this._headers,
// 		}).then((res) => {
// 			return this._prepareDate(res);
// 		});
// 	}

// 	changeLikeCardStatus(id, condition) {
// 		return fetch(`${this._url}/cards/${id}/likes`, {
// 			method: condition ? 'PUT' : 'DELETE',
// 			headers: this._headers,
// 		}).then((res) => {
// 			return this._prepareDate(res);
// 		});
// 	}
// }
