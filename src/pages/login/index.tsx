import { Heading, Text } from 'grommet';
import React from 'react';

import { Window } from 'components';

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
                <Text>
                    Amount: {props.amount}
                    To: {props.toAddress}
                    Expiration: {props.expiration}
                </Text>
            </Window>
        </>
    )
}
