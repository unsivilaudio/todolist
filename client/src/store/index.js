import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import persistLogin from './middleware/persist-login';

import reducers from './rootReducer';

const composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})) ||
    compose;

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(persistLogin, thunk))
);

export default store;
