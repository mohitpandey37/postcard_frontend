import {

    Stack,
    Heading,
    Text,
    Button,
    Flex,
} from '@chakra-ui/react';
import React, { useState } from "react";

export function CardLayout(props) {
    const [layout, setLayout] = useState(true);
    console.log('props',props)
    return (
        <>
            {layout ? <CardFrontLayout value={props} /> : <CardBackLayout value={props} />}
            <Button colorScheme='blue' onClick={() => { setLayout(true) }}>Front</Button>{" "}
            <Button colorScheme='blue' onClick={() => { setLayout(false) }}>Back</Button>
        </>)
}


function CardFrontLayout(props) {
    let data = props.value.value;
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Heading as='h3' size='lg'>
                    Perview
                </Heading>
                <div style={{ width: '500px', height: '300px', border: '1px solid grey', borderRadius: "10px", padding: '16px' }}>
                    <Text py='1'>
                        <div style={{ flex: "1", padding: "16px", width: '50%', }}
                            dangerouslySetInnerHTML={{ __html: data.message }} />
                    </Text>
                </div>
            </Stack>
        </Flex>

    )
}

function CardBackLayout(props) {
    console.log(props)
    let data = props.value.value;
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Heading as='h3' size='lg'>
                    Perview
                </Heading>
                <div style={{ width: '500px', height: '300px', border: '1px solid grey', borderRadius: "10px", padding: '16px' }}>
                    <p>To,<br />
                        Mr./Ms. {data.recipient}<br />
                        {data.street_1}{" "}{data.street_2 ? data.street_2 : ""}<br />
                        {data.zipcode ? data.zipcode : ""},{" "}{data.city},{" "}{data.state}
                    </p>
                </div>
            </Stack>
        </Flex>

    )
}
