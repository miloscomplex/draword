import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import rootReducer from './reducers/rootReducer';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { ActionCableProvider } from './context/ActionCable'
import { API_WS_ROOT } from './constants'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk)),
)

ReactDOM.render(
  <React.StrictMode>
    <ActionCableProvider url={API_WS_ROOT}>
      <Provider store={store}>
        <App />
      </Provider>
    </ActionCableProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
