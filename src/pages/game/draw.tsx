import { Box, Button, Heading, Text } from 'grommet';
import React from 'react';
import { useGame } from 'providers/game';

export default function DrawGame() {

    const {
        draw,
        numberOne,
        numberTwo,
        numberThree,
        winningNumOne,
        winningNumTwo,
        winningNumThree,
    } = useGame();

    console.log(winningNumOne, winningNumTwo, winningNumThree);

    return (
        <>
            <Heading>You Picked</Heading>
            <Box
                direction={'row'}
                gap={'xlarge'}
            >
                <Heading>
                    {numberOne}
                </Heading>
                <Heading>
                    {numberTwo}
                </Heading>
                <Heading>
                    {numberThree}
                </Heading>
            </Box>
            <Box
                align={'center'}
                pad={'medium'}
                gap={'large'}
                direction={'column'}
            >
                {
                    winningNumOne === null || winningNumTwo === null || winningNumThree === null ? (
                        <>
                            <Text>
                                Draw to see if you win.
                            </Text>
                            <Button type={'submit'} primary label={'Draw'} onClick={() => draw()}/>
                        </>
                    ) : (
                        <>
                            <Heading>The Numbers Drawn Are:</Heading>
                            <Box
                                direction={'row'}
                                gap={'xlarge'}
                            >
                                <Heading>
                                    {winningNumOne}
                                </Heading>
                                <Heading>
                                    {winningNumTwo}
                                </Heading>
                                <Heading>
                                    {winningNumThree}
                                </Heading>
                            </Box>
                        </>
                    )

                }
            </Box>
        </>
    )
}
