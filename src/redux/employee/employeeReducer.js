import { employeeActionTypes } from './employeeActions';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
	employeesLoading: false,
	userAccountFormLoading: false,
	employeeDetailsFormLoading: false,
	employees: null,
	createdAccountUid: null,
	updatedAccountUid: null,
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case employeeActionTypes.GET_ALL_EMPLOYEES:
			return {
				...state,
				employeesLoading: true,
			};
		case employeeActionTypes.GET_ALL_EMPLOYEES_SUCCESS:
			return {
				...state,
				employeesLoading: false,
				employees: action.data,
			};
		case employeeActionTypes.GET_ALL_EMPLOYEES_FAILED:
			return {
				...state,
				employeesLoading: false,
				employees: null,
			};
		case employeeActionTypes.REGISTER_USER:
			return {
				...state,
				userAccountFormLoading: true,
			};
		case employeeActionTypes.REGISTER_USER_SUCCESS:
			return {
				...state,
				userAccountFormLoading: false,
				createdAccountUid: action.data.id,
			};
		case employeeActionTypes.REGISTER_USER_FAILED:
			return {
				...state,
				userAccountFormLoading: false,
				createdAccountUid: null,
			};
		case employeeActionTypes.ADD_EMPLOYEE_DETAILS:
			return {
				...state,
				employeeDetailsFormLoading: true,
			};
		case employeeActionTypes.ADD_EMPLOYEE_DETAILS_SUCCESS:
			return {
				...state,
				userAccountFormLoading: false,
				employeeDetailsFormLoading: false,
				createdAccountUid: null,
			};
		case employeeActionTypes.ADD_EMPLOYEE_DETAILS_FAILED:
			return {
				...state,
				employeeDetailsFormLoading: false,
			};
		case employeeActionTypes.UPDATE_USER:
			return {
				...state,
				userAccountFormLoading: true,
			};
		case employeeActionTypes.UPDATE_USER_SUCCESS:
			return {
				...state,
				userAccountFormLoading: false,
				updatedAccountUid: action.data.id,
			};
		case employeeActionTypes.UPDATE_USER_FAILED:
			return {
				...state,
				userAccountFormLoading: false,
				updatedAccountUid: null,
			};
		case employeeActionTypes.UPDATE_EMPLOYEE_DETAILS:
			return {
				...state,
				employeeDetailsFormLoading: true,
			};
		case employeeActionTypes.UPDATE_EMPLOYEE_DETAILS_SUCCESS:
			return {
				...state,
				employeeDetailsFormLoading: false,
				updatedAccountUid: null,
			};
		case employeeActionTypes.UPDATE_EMPLOYEE_DETAILS_FAILED:
			return {
				...state,
				employeeDetailsFormLoading: false,
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
