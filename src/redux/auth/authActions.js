export const authActionTypes = {
	USER_LOGIN: 'auth/user_login',
	USER_LOGIN_SUCCESS: 'auth/user_login_success',
	USER_LOGIN_FAILED: 'auth/user_login_failed',
	LOCAL_AUTH_INIT: 'auth/local_auth_init',
	LOCAL_AUTH_SUCCESS: 'auth/local_auth_success',
	LOCAL_AUTH_FAILED: 'auth/local_auth_failed',
};

export function userLogin(payload, history) {
	return { type: authActionTypes.USER_LOGIN, payload, history };
}

export function localAuthenticate() {
	return { type: authActionTypes.LOCAL_AUTH_INIT };
}

export function userLogout() {
	localStorage.removeItem('access_token');
	return { type: authActionTypes.LOCAL_AUTH_INIT };
}
