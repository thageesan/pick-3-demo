import React from 'react';

import {Grommet, Main} from 'grommet';
import { grommet } from 'grommet/themes'

interface IWindowProps {
    children: any
}

export default function Window(props: IWindowProps) {
    return (
        <Grommet
            theme={grommet}
            full
        >
            <Main
                direction={'column'}
                fill={true}
                align={'center'}
            >
                {props.children}
            </Main>
        </Grommet>
    )
}
