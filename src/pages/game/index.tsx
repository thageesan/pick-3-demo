import React from 'react';
import { useGame } from 'providers/game';
import NewGame from './new';
import PickNumbers from './pick';
import DrawGame from './draw';

export default function GamePage() {

    const {
        gameFound,
        numberOne,
        numberTwo,
        numberThree,
    } = useGame();

    return (
        <>
            {
                !gameFound ? (
                    <NewGame/>
                ) : gameFound && ( numberOne === null || numberTwo === null || numberThree === null) ? (
                    <PickNumbers/>
                ) : gameFound && ( numberOne !== null || numberTwo !== null || numberThree !== null) ? (
                    <DrawGame/>
                ) : null
            }

        </>
    )
}
