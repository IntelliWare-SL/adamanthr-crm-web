import axios from 'axios';
import config from 'config';

export const API = axios.create({
	baseURL: config.apiUrl,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		'Accept-Language': 'en',
		'Content-Language': 'en',
	},
});

API.interceptors.request.use(
	async function (config) {
		const bearerToken = localStorage.getItem('access_token');
		config.headers['Authorization'] = `Bearer ${bearerToken}`;
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

API.interceptors.response.use(
	function (response) {
		return response;
	},
	async function (error) {
		if (error.response) {
			const errorCode = error.response.status;
			if (errorCode === 401) {
				/*        if (window) {
          if (window.location.pathname !== '/') {
            window.location.href = '/';
          }
        }*/
			}
		}
		return Promise.reject(error);
	}
);
