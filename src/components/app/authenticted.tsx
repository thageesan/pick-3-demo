import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Anchor, Nav } from 'grommet';
import { Logout as LogoutIcon } from 'grommet-icons';

import GamePage from 'pages/game';
import { Window } from 'components/index';
import { useAuth } from 'providers/auth';
import { GameProvider } from 'providers/game';
import GameApi from 'core/api/game';

export default function AuthenticatedApp() {

    const { logout, pubSub } = useAuth();

    const gameApi = new GameApi();

    return (
        <Window>
            <Nav
                direction="row"
                background="brand"
                fill={'horizontal'}
                pad="medium"
                justify={'end'}
            >
                <Anchor
                    onClick={logout}
                    icon={<LogoutIcon />}
                />
            </Nav>
            <Switch>
                <GameProvider gameAPI={gameApi} pubSub={pubSub}>
                    <Route exact path={'/game'}>
                        <GamePage/>
                    </Route>
                    <Redirect  to='/game' />
                </GameProvider>
            </Switch>
        </Window>

    )
}
