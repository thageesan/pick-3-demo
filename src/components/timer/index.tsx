import { utils } from 'core';

import { Box, Heading, Meter } from 'grommet';
import React, { useEffect, useState } from 'react';

interface ITimerProps {
    expiryTime: number
}

interface ITimerState {
    timeLeft: number
    startDelta: number
}

export default function TimerComponent(props: ITimerProps) {
    const startTime = utils.currentTimeInSeconds();
    const defaultState: ITimerState = {
        timeLeft: props.expiryTime - startTime,
        startDelta: props.expiryTime - startTime,
    };

    const [state, setState] = useState(defaultState);

    function countdown() {
        const timeLeft = props.expiryTime - utils.currentTimeInSeconds();
        setState((state) => ({...state, timeLeft: timeLeft}));
        if (timeLeft > 0) {
            setTimeout(countdown, 500);
        } else {
            setState((state) => ({...state, timeLeft: 0}));
        }
    }


    useEffect(() => {
        countdown();
    }, []);

    return (
        <Box
            align={'center'}
            pad={'large'}
        >
            <Meter
                type={'circle'}
                values={[
                    {
                        value: Math.trunc(state.timeLeft / state.startDelta * 100),
                        color: 'graph-0',
                        highlight: true
                    }
                ]}
            />
            <Heading>
                {state.timeLeft} seconds left.
            </Heading>
        </Box>
    )
}
