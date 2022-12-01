import { put, takeEvery } from 'redux-saga/effects';
import { employeeActionTypes } from './employeeActions';
import { API } from '../../utils/axios';
import { toast } from 'react-toastify';

export function* getAllEmployeesSaga() {
	try {
		const { data } = yield API.get(`users/admin/getAllEmployees`);
		yield put({
			type: employeeActionTypes.GET_ALL_EMPLOYEES_SUCCESS,
			data,
		});
	} catch (e) {
		toast.error(
			e.response?.data?.message || 'Error in retrieving employee data'
		);
		yield put({ type: employeeActionTypes.GET_ALL_EMPLOYEES_FAILED });
		console.log(e);
	}
}

export function* registerUserSaga({ payload }) {
	try {
		const { data } = yield API.post(`users/admin/registerUser`, payload);
		toast.success('User account created successfully');
		yield put({
			type: employeeActionTypes.REGISTER_USER_SUCCESS,
			data,
		});
	} catch (e) {
		toast.error(e.response?.data?.message || 'Error in registering user');
		yield put({ type: employeeActionTypes.REGISTER_USER_FAILED });
		console.log(e);
	}
}

export function* addEmployeeDetailsSaga({ payload }) {
	try {
		const { data } = yield API.post(`users/admin/addEmployeeDetails`, payload);
		toast.success('Employee details added successfully');
		yield put({
			type: employeeActionTypes.ADD_EMPLOYEE_DETAILS_SUCCESS,
			data,
		});
	} catch (e) {
		toast.error(
			e.response?.data?.message || 'Error in adding employee details'
		);
		yield put({ type: employeeActionTypes.ADD_EMPLOYEE_DETAILS_FAILED });
		console.log(e);
	}
}

function* watchSagas() {
	yield takeEvery(employeeActionTypes.GET_ALL_EMPLOYEES, getAllEmployeesSaga);
	yield takeEvery(employeeActionTypes.REGISTER_USER, registerUserSaga);
	yield takeEvery(
		employeeActionTypes.ADD_EMPLOYEE_DETAILS,
		addEmployeeDetailsSaga
	);
}

export default [watchSagas];
