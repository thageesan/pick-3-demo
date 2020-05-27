import { Box, Button, Form, FormField, Heading, TextInput } from 'grommet';
import React, { useState } from 'react';

import { Window } from 'components';


interface IHomePageState {
    nanoAddress: string
}

interface IHomePageProps {
    register: (nanoAddress: string| null) => Promise<void>
}

export default function HomePage(props: IHomePageProps) {

    const defaultState: IHomePageState = {
        nanoAddress: '',
    };

    const [state, setState] = useState(defaultState);


    return (
        <>
            <Window>
                <Heading>Welcome to the Pick 3 Demo</Heading>
                <Form
                    value={state}
                    onChange={(nextValue: any) => {
                        setState(nextValue)
                    }}
                    onSubmit={() => {
                        props.register(state.nanoAddress).then(() => null)
                    }}
                >
                    <Box
                        direction={'row'}
                        gap={'medium'}
                    >
                        <FormField
                            name={'nanoAddress'}
                            label={'Enter your Nano address'}
                        >
                            <TextInput id={'nanoAddress'} name={'nanoAddress'} placeholder={'Nano Address'}/>
                        </FormField>
                    </Box>
                    <Box
                        direction={'column'}
                        gap={'medium'}
                        justify={'center'}
                    >
                        <Button type={'submit'} primary label={'Initialize'} />
                    </Box>
                </Form>
            </Window>
        </>
    )
}
