import { Heading, Text } from 'grommet';
import React from 'react';
import { useGame } from 'providers/game';



export default function GamePage() {

    const {
        amount,
        gameAddress,
        gameFound
    } = useGame();

    return (
        <>
            <Heading>Game Page</Heading>
            <Text>
                {
                    !gameFound ? (
                            `You have not active draws at the moment.  To create one send ${amount} Nano to ${gameAddress}`
                    ) : (
                        `Game found!`
                    )
                }
            </Text>
        </>
    )
}
