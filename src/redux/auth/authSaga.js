import { put, takeEvery, select } from 'redux-saga/effects';
import { authActionTypes } from './authActions';
import { API } from '../../utils/axios';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';

export function* userLoginSaga({ payload, history }) {
	try {
		const { data } = yield API.post(`users/admin/login`, {
			email: payload.email,
			password: payload.password,
		});
		localStorage.setItem('access_token', data?.accessToken);
		history.push('/app/main/dashboard');
		yield put({
			type: authActionTypes.LOCAL_AUTH_SUCCESS,
		});
		yield put({
			type: authActionTypes.USER_LOGIN_SUCCESS,
			data,
		});
	} catch (e) {
		toast.error(e.response?.data?.message || 'User Login Error');
		yield put({ type: authActionTypes.USER_LOGIN_FAILED });
		console.log(e);
	}
}

export function* localAuthenticate(action) {
	try {
		const tokenInfo = jwtDecode(localStorage.getItem('access_token'));
		yield put({
			type: authActionTypes.LOCAL_AUTH_SUCCESS,
		});
	} catch (e) {
		yield put({ type: authActionTypes.LOCAL_AUTH_FAILED });
		console.log(e);
	}
}

function* watchSagas() {
	yield takeEvery(authActionTypes.USER_LOGIN, userLoginSaga);
	yield takeEvery(authActionTypes.LOCAL_AUTH_INIT, localAuthenticate);
}

export default [watchSagas];
