import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Entryfile/Main';
import configureStore from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
window.Popper = require('popper.js').default;

const store = configureStore();
const persistor = persistStore(store);

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<Main />
		</PersistGate>
	</Provider>,
	document.getElementById('app')
);

if (module.hot) {
	// enables hot module replacement if plugin is installed
	module.hot.accept();
}
