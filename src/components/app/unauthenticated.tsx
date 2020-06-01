import { Redirect, Route, Switch } from 'react-router-dom';
import { HomePage, LoginPage } from 'pages';
import React from 'react';
import { useAuth } from 'providers/auth';

export default function UnauthenticatedApp() {
    const {
        amount,
        error,
        expiration,
        register,
        toAddress,
    } = useAuth();
    return (
        <Switch>
            <Route exact path={'/'}>
                <HomePage
                    error={error}
                    register={register}
                />
            </Route>
            <Route exact path={'/login'}>
                {amount && expiration && toAddress ? (
                    <LoginPage amount={amount} expiration={expiration} toAddress={toAddress}/>
                ) : (
                    <Redirect to={'/'} />
                )}
            </Route>

            <Redirect  to='/' />

        </Switch>
    )
}
