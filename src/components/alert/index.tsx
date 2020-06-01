import { Box, Text } from 'grommet';
import React from 'react';

interface IAlertComponent {
    message: string
}

export default function AlertComponent(props: IAlertComponent) {
    return (
        <Box background="status-error">
            <Box pad="medium" gap="medium">
                <Text
                    wordBreak={'break-word'}
                >{props.message}</Text>
            </Box>
        </Box>
    )
}
