import { all, fork } from 'redux-saga/effects';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import authSagas from '../src/redux/auth/authSaga';

import AuthReducer from '../src/redux/auth/authReducer';

export const createRootReducer = () =>
	combineReducers({
		auth: AuthReducer,
	});

function* rootSaga() {
	yield all([yield all(authSagas.map((s) => fork(s)))]);
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
