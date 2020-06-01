import { Box, Button, Form, FormField, Heading, Text, TextInput } from 'grommet';
import React, { useState } from 'react';

import { AlertComponent, Window } from 'components';


interface IHomePageState {
    nanoAddress: string
}

interface IHomePageProps {
    register: (nanoAddress: string| null) => Promise<void>
    error: string | null
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
                <Box

                    width={'large'}
                    pad={'medium'}
                >
                    <Form
                        value={state}
                        onChange={(nextValue: any) => {
                            setState(nextValue)
                        }}
                        onSubmit={() => {
                            props.register(state.nanoAddress).then(() => null)
                        }}
                    >
                        <FormField
                            name={'nanoAddress'}
                            label={'Enter your Nano address'}
                        >
                            <TextInput
                                size={'large'}
                                id={'nanoAddress'}
                                name={'nanoAddress'}
                                placeholder={'Nano Address'}/>
                        </FormField>
                        <Box
                            align={'center'}
                            pad={'medium'}
                            gap={'medium'}
                            direction={'column'}
                        >
                            <Button type={'submit'} primary label={'Initialize'} />
                            { props.error ? (
                                <AlertComponent
                                    message={props.error}
                                ></AlertComponent>
                            ): null}
                        </Box>
                    </Form>
                </Box>

            </Window>
        </>
    )
}
