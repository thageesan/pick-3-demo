import { Box, Button, Form, FormField, Text } from 'grommet';
import { NumberInput } from 'components/input/number';
import { AlertComponent } from 'components';
import React, { useState } from 'react';
import { useGame } from 'providers/game';

interface IPickNumbersState {
    numberOne: string
    numberTwo: string
    numberThree: string
}

export default function PickNumbers() {

    const defaultState: IPickNumbersState = {
        numberOne: '0',
        numberTwo: '0',
        numberThree: '0',
    };

    const [state, setState] = useState(defaultState);

    const {
        error,
        errorMessage,
        pickNumbers,
    } = useGame();

    return (
        <Box
            width={'large'}
            pad={'medium'}
        >
            <Form
                value={state}
                onChange={(nextValue: any) => {
                    setState(nextValue)
                }}
                onSubmit={() => pickNumbers(state.numberOne, state.numberTwo, state.numberThree)}
            >
                <FormField
                    label={
                        <Box
                            fill={'horizontal'}
                        >
                            <Text alignSelf={'center'} size={'large'}>Pick 3 numbers</Text>
                        </Box>
                    }
                >
                    <Box
                        direction={'row'}
                        pad={'small'}
                        gap={'xlarge'}
                    >
                        <NumberInput
                            maxLength={1}
                            size={'xlarge'}
                            id={'numberOne'}
                            name={'numberOne'}
                            placeholder={'0'}
                            plain={false}
                        />
                        <NumberInput
                            maxLength={1}
                            size={'xlarge'}
                            id={'numberTwo'}
                            name={'numberTwo'}
                            placeholder={'0'}
                            plain={false}
                        />
                        <NumberInput
                            maxLength={1}
                            size={'xlarge'}
                            id={'numberThree'}
                            name={'numberThree'}
                            placeholder={'0'}
                            plain={false}
                        />
                    </Box>
                </FormField>
                <Box
                    align={'center'}
                    pad={'medium'}
                    gap={'medium'}
                    direction={'column'}
                >
                    <Button type={'submit'} primary label={'Submit'}/>
                    { error && errorMessage ? (
                        <AlertComponent
                            message={errorMessage}
                        />
                    ): null}
                </Box>
            </Form>
        </Box>
    )
}
