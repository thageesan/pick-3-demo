import { utils } from 'core'

import React, { useState } from 'react';

import { AlertComponent, Window } from 'components';
import { Box, Button, Form, FormField, Heading, TextInput } from 'grommet';


interface IHomePageState {
    nanoAddress: string | null
    error: string | null
}

export default function HomePage() {

    const defaultState: IHomePageState = {
        error: null,
        nanoAddress: null,
    };

    const [state, setState] = useState(defaultState);
    async function register(): Promise<void> {
        const { nanoAddress }  = state;
        if (nanoAddress === null) {
            setState((state) => ({...state, error: 'Please enter a nano address.'}));
            return;
        }

        if (utils.validateNanoAddress(nanoAddress)) {
            /**
             * TODO: make api call and register nano address
             * TODO: navigate to login page
             */

            setState((state) => ({...state, error: null}))
        } else {
            setState((state) => ({...state, error: 'You have entered an invalid Nano address.'}))
        }
    }


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
                        register().then(() => null)
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
                        { state.error ? (
                            <AlertComponent message={state.error}/>
                        ): null}
                    </Box>
                </Form>
            </Window>
        </>
    )
}
