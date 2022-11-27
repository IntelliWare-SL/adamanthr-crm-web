import { employeeActionTypes } from './employeeActions';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
	userAccountLoading: false,
	employeeDetailsLoading: false,
	createdAccountUid: null,
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case employeeActionTypes.REGISTER_USER:
			return {
				...state,
				userAccountLoading: true,
			};
		case employeeActionTypes.REGISTER_USER_SUCCESS:
			return {
				...state,
				userAccountLoading: false,
				createdAccountUid: action.data.id,
			};
		case employeeActionTypes.REGISTER_USER_FAILED:
			return {
				...state,
				userAccountLoading: false,
				createdAccountUid: null,
			};
		case employeeActionTypes.ADD_EMPLOYEE_DETAILS:
			return {
				...state,
				employeeDetailsLoading: true,
			};
		case employeeActionTypes.ADD_EMPLOYEE_DETAILS_SUCCESS:
			return {
				...state,
				userAccountLoading: false,
				employeeDetailsLoading: false,
				createdAccountUid: null,
			};
		case employeeActionTypes.ADD_EMPLOYEE_DETAILS_FAILED:
			return {
				...state,
				userAccountLoading: false,
				createdAccountUid: null,
			};
		default:
			return state;
	}
}

const persistConfig = {
	keyPrefix: 'crm-',
	key: 'employees',
	storage,
};

export default persistReducer(persistConfig, reducer);
