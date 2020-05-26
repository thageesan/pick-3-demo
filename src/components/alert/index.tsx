import { Box, Text } from 'grommet';
import React from 'react';

interface IAlertComponent {
    message: string
}

export default function AlertComponent(props: IAlertComponent) {
    return (
        <Box fill="horizontal" background="status-error">
            <Box pad="medium" direction="row" gap="medium" align="center">
                <Text>{props.message}</Text>
            </Box>
        </Box>
    )
}
