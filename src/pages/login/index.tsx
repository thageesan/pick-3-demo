import { Heading, Text } from 'grommet';
import React from 'react';

import { Window } from 'components';
import TimerComponent from 'components/timer';

interface ILoginPageProps {
    amount: string | null
    expiration: string | null
    toAddress: string | null
}

export default function LoginPage(props: ILoginPageProps) {

    return (
        <>
            <Window>
                <Heading>Login Page</Heading>
                <Text
                    size={'large'}
                >
                    To Login Send {props.amount} Nano to {props.toAddress}
                </Text>
                <TimerComponent expiryTime={props.expiration ? parseInt(props.expiration) : 0}/>
            </Window>
        </>
    )
}
