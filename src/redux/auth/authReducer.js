import { authActionTypes } from './authActions';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
	loading: false,
	userDetails: {},
	isAuthenticated: false,
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case authActionTypes.USER_LOGIN:
			return {
				...state,
				loading: true,
			};
		case authActionTypes.USER_LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				userDetails: action.data,
			};
		case authActionTypes.USER_LOGIN_FAILED:
			return {
				...state,
				loading: false,
			};
		case authActionTypes.LOCAL_AUTH_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
			};
		case authActionTypes.LOCAL_AUTH_FAILED:
			return {
				...state,
				isAuthenticated: false,
			};
		default:
			return state;
	}
}

const persistConfig = {
	keyPrefix: 'crm-',
	key: 'auth',
	storage,
};

export default persistReducer(persistConfig, reducer);
