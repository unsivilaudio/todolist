import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from 'store';

import Main from 'containers/Main';
import 'styles/index.scss';

const root = createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <Main />
        </Provider>
    </BrowserRouter>
);
