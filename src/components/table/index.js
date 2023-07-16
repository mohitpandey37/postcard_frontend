import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Heading,
    Button
} from '@chakra-ui/react';
import React, { useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function TableComponent(props) {
    let data = props.value;
    const [state, setState] = useState(false)

    return (
        <TableContainer style={{ width: "100%", margin: "10px 0" }}>
            <Heading as='h3' size='lg'>
                Post's List
            </Heading>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Recipient Name</Th>
                        <Th>Message</Th>
                        <Th isNumeric>Link</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((el, i) => {
                        return (
                            <Tr key={i}>
                                <Td>{el.recipient}</Td>
                                <Td>{el.message}</Td>
                                <Td isNumeric>
                                    <Button colorScheme='teal' size='sm'>
                                        <CopyToClipboard text={`http://localhost:3000/postcard/preview/${el._id}`}
                                            onCopy={()=>{
                                                setState(true)
                                                toast.success("Copied Successfully.");
                                            }}
                                        >
                                            <span>Copy Link</span>
                                        </CopyToClipboard>
                                    </Button></Td>
                            </Tr>)
                    })}
                </Tbody>
            </Table>
            <ToastContainer autoClose={3000} theme="colored" />
        </TableContainer>
    )
}