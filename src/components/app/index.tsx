import { utils, LoginAPI } from 'core';

import React, { useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'

import { HomePage, LoginPage } from 'pages';
import { AlertComponent } from 'components';

interface IAppState {
    amount: string | null
    error: string | null
    expiration: string | null
    nanoAddress: string | null
    toAddress: string | null
}

export default function App() {

    const loginApi = new LoginAPI();

    const history = useHistory();

    const defaultState: IAppState = {
        amount: null,
        error: null,
        expiration: null,
        nanoAddress: null,
        toAddress: null,
    };

    const [state, setState] = useState(defaultState);
    async function register(nanoAddress: string | null): Promise<void> {

        if (nanoAddress === null) {
            setState((state) => ({...state, error: 'Please enter a nano address.'}));
            return;
        }

        if (utils.validateNanoAddress(nanoAddress)) {

            const response = await loginApi.register(nanoAddress) as {[key:string]: string};
            const toAddress: string = response['address'];
            const amount: string = response['amount'];
            const expiration = response['timestamp'];
            const sessionId = response['session_id'];

            setState((state) => ({...state, error: null, toAddress: toAddress, amount: amount, expiration: expiration}));

            loginApi.connectToStream(sessionId);

            history.push('/login');
            await loginApi.testSSE();
        } else {
            setState((state) => ({...state, error: 'You have entered an invalid Nano address.'}))
        }
    }

    return (
        <Switch>
            <Route exact path={'/'}>
                <HomePage register={register}/>
            </Route>
            <Route exact path={'/login'}>
                {state.amount && state.expiration && state.toAddress ? (
                    <LoginPage amount={state.amount} expiration={state.expiration} toAddress={state.toAddress}/>
                ) : (
                    <Redirect to={'/'} />
                )}
            </Route>
            <Redirect  to='/' />
            { state.error ? (
                <AlertComponent message={state.error}/>
            ): null}
        </Switch>
    )
}
