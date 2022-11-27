import { all, fork } from 'redux-saga/effects';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import authSagas from '../src/redux/auth/authSaga';
import employeeSagas from '../src/redux/employee/employeeSaga';

import AuthReducer from '../src/redux/auth/authReducer';
import EmployeeReducer from './redux/employee/employeeReducer';

export const createRootReducer = () =>
	combineReducers({
		auth: AuthReducer,
		employee: EmployeeReducer,
	});

function* rootSaga() {
	yield all([yield all(authSagas.map((s) => fork(s)))]);
	yield all([yield all(employeeSagas.map((s) => fork(s)))]);
}

function configureStore() {
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(
		createRootReducer(),
		composeWithDevTools(applyMiddleware(sagaMiddleware))
	);
	sagaMiddleware.run(rootSaga);
	return store;
}

export default configureStore;
