import { Text } from 'grommet';
import React from 'react';
import { useGame } from 'providers/game';

export default function NewGame() {

    const {
        amount,
        gameAddress
    } = useGame();

    return (
        <Text>
            `You have no active draws at the moment.  To create one send ${amount} Nano to ${gameAddress}`
        </Text>
    )
}
