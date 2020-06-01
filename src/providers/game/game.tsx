import React, { useEffect, useReducer } from 'react';
import { EPubSubChannels, GameApi, PubSub } from 'core';


import reducer, { defaultState, EGameAction } from './reducer';


interface IGameProviderProps {
    children: any
    gameAPI: GameApi
    pubSub: PubSub
}

const GameContext = React.createContext({
    activeGame: async () => {
        return;
    },
    amount: '',
    game: {},
    gameAddress: '',
    gameFound: false,
    gameId: '',
    provisionGame: async () => {
        return;
    },
    ticketId: '',
});

GameContext.displayName = 'GameContext';


function GameProvider(props: IGameProviderProps) {


    async function init() {
        await activeGame();
    }

    // @ts-ignore
    const [state, dispatch] = useReducer(reducer, defaultState, init);

    useEffect(() => {
        props.pubSub.subscribe(EPubSubChannels.GAME_CREATED, async () => {
            await activeGame();
        });
    }, []);

    async function activeGame(): Promise<void> {
        const response = await props.gameAPI.activeGame();

        if (response && response.hasOwnProperty('result')) {
            const data = response as any;
            const { result } = data;
            if (result === 'not found') {
                // @ts-ignore
                dispatch({
                    type: EGameAction.NO_ACTIVE_GAME_FOUND,
                    items: {
                        gameFound: false,
                    }
                });
                await provisionGame();
            } else if (result === 'found') {
                const { ticket_id, game_id } = data;
                // @ts-ignore
                dispatch({
                    type: EGameAction.ACTIVE_GAME_FOUND,
                    items: {
                        gameFound: true,
                        ticketId: ticket_id,
                        gameId: game_id,
                    }
                })
            }
        }
    }

    async function provisionGame(): Promise<void> {
        const response = await props.gameAPI.provisionGame();

        if (response && response.hasOwnProperty('address')) {
            const data = response as { address: string, amount: string};
            const { address, amount } = data;
            // @ts-ignore
            dispatch({
                type: EGameAction.RECEIVED_GAME_PROVISION_INFO,
                items: {
                    address,
                    amount,
                }
            })
        }
    }

    const {
        amount,
        game,
        gameAddress,
        gameFound,
        gameId,
        ticketId,
    } = state;


    const value = {
        amount,
        activeGame,
        game,
        gameAddress,
        gameFound,
        gameId,
        provisionGame,
        ticketId,
    };

    return (
        <GameContext.Provider value={value}>
            {props.children}
        </GameContext.Provider>
    )

}

function useGame() {
    const context = React.useContext(GameContext);
    if (context === undefined) {
        throw new Error(`useGame must be used within a GameProvider`)
    }
    return context;
}

export {
    GameProvider,
    useGame
}
