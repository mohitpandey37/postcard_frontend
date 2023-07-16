import {
    Alert,
    AlertIcon,
    Stack
} from '@chakra-ui/react'


export default function alertBar (props) {

    return (
        <Stack spacing={3}>
            <Alert status={props.value.status ? "success": "error"}>
                <AlertIcon />
                {props.value.title}
            </Alert>
        </Stack>
    )
}