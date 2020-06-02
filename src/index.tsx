import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from 'components'
import { AuthProvider } from 'providers/auth';
import { LoginAPI, PubSub } from 'core';

const pubSub = new PubSub();
const loginAPI = new LoginAPI(pubSub);

render(
    <BrowserRouter>
        <AuthProvider loginApi={loginAPI} pubSub={pubSub}>
            <App />
        </AuthProvider>
    </BrowserRouter>
    , document.querySelector('#root')
);
