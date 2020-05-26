import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import { HomePage } from 'pages';

export default function App() {
    return (
        <>
            <Switch>
                <Route exact path={'/'} component={ HomePage }/>
                <Redirect  to='/' />
            </Switch>
        </>

    )
}
