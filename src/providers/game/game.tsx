import React, { useEffect, useReducer } from 'react';
import { EPubSubChannels, GameApi, PubSub, utils } from 'core';


import reducer, { defaultState, EGameAction, IGameState } from 'providers/game/reducer';


interface IGameProviderProps {
    children: any
    gameAPI: GameApi
    pubSub: PubSub
}

const GameContext = React.createContext({
    ...defaultState,
    activeGame: async () => {
        return;
    },
    draw: async () => {
        return;
    },
    pickNumbers: async (_numberOne: string, _numberTwo: string, _numberThree: string) => {
        return;
    },
    provisionGame: async () => {
        return;
    },
});

GameContext.displayName = 'GameContext';


function GameProvider(props: IGameProviderProps) {

    function init(defaultState: IGameState) {
        return defaultState;
    }

    const [state, dispatch] = useReducer(reducer, defaultState, init);

    useEffect(() => {
        props.pubSub.subscribe(EPubSubChannels.GAME_CREATED, async () => {
            await activeGame();
        });

        props.pubSub.subscribe(EPubSubChannels.DREW_NUMBERS, (numbers: Array<string>) => {
            const [ numberOne, numberTwo, numberThree ] = numbers;
            if (!utils.isNumber(numberOne) || !utils.isNumber(numberTwo) || !utils.isNumber(numberThree)) {
                return;
            }
            const numOne: number = parseInt(numberOne);
            const numTwo: number = parseInt(numberTwo);
            const numThree: number = parseInt(numberThree);

            if (numOne > 9 && numOne < 0 || numTwo > 9 && numTwo < 0 || numThree > 9 && numTwo < 0 ) {
                return;
            }

            dispatch({
                type: EGameAction.WINNING_NUMBERS,
                item: {
                    winningNumOne: numOne,
                    winningNumTwo: numTwo,
                    winningNumThree: numThree,
                }
            });

        });
        // noinspection JSIgnoredPromiseFromCall
        activeGame();
    }, []);

    async function activeGame(): Promise<void> {
        const response = await props.gameAPI.activeGame();

        if (response && response.hasOwnProperty('result')) {
            const data = response as any;
            const { result } = data;
            if (result === 'not found') {

                dispatch({
                    type: EGameAction.NO_ACTIVE_GAME_FOUND,
                    item: {
                        gameFound: false,
                    }
                });
                await provisionGame();
            } else if (result === 'found') {
                const { ticketId, gameId, firstNumber, secondNumber, thirdNumber } = data;
                // @ts-ignore
                dispatch({
                    type: EGameAction.ACTIVE_GAME_FOUND,
                    item: {
                        gameFound: true,
                        ticketId: ticketId,
                        gameId: gameId,
                        numberOne: firstNumber,
                        numberTwo: secondNumber,
                        numberThree: thirdNumber,
                        winningNumOne: null,
                        winningNumTwo: null,
                        winningNumThree: null,
                    }
                })
            }
        }
    }

    async function draw(): Promise<void> {
        const {
            gameId,
            ticketId,
        } = state;
        await props.gameAPI.draw(gameId, ticketId);
    }

    async function pickNumbers(numberOne: string, numberTwo: string, numberThree: string): Promise<void> {
        if (!utils.isNumber(numberOne) || !utils.isNumber(numberTwo) || !utils.isNumber(numberThree)) {
            dispatch({
                type: EGameAction.NOT_A_NUMBER,
                item: null
            });
            return;
        }

        const numOne: number = parseInt(numberOne);
        const numTwo: number = parseInt(numberTwo);
        const numThree: number = parseInt(numberThree);

        if (numOne > 9 && numOne < 0 || numTwo > 9 && numTwo < 0 || numThree > 9 && numTwo < 0 ) {

            dispatch({
                type: EGameAction.NUMBER_NOT_IN_RANGE,
                item: null
            });
            return;
        }


        dispatch({
            type: EGameAction.REMOVE_ERROR_FLAG,
            item: null
        });
        const { ticketId } = state;
        const response = await props.gameAPI.pickNumbers([numOne, numTwo, numThree], ticketId);

        if (response && response.hasOwnProperty('status')) {
            const data = response as { status: string, message: string};
            const { status } = data;
            if (status === 'success') {
                await activeGame();
            }
        }

    }

    async function provisionGame(): Promise<void> {
        const response = await props.gameAPI.provisionGame();

        if (response && response.hasOwnProperty('address')) {
            const data = response as { address: string, amount: string};
            const { address, amount } = data;

            dispatch({
                type: EGameAction.RECEIVED_GAME_PROVISION_INFO,
                item: {
                    address,
                    amount,
                }
            })
        }
    }

    const {
        amount,
        error,
        errorMessage,
        game,
        gameAddress,
        gameFound,
        gameId,
        numberOne,
        numberTwo,
        numberThree,
        ticketId,
        winningNumOne,
        winningNumTwo,
        winningNumThree,
    } = state;


    const value = {
        amount,
        activeGame,
        draw,
        error,
        errorMessage,
        game,
        gameAddress,
        gameFound,
        gameId,
        numberOne,
        numberTwo,
        numberThree,
        pickNumbers,
        provisionGame,
        ticketId,
        winningNumOne,
        winningNumTwo,
        winningNumThree,
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
