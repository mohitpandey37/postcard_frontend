import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Heading,
    Button,
} from '@chakra-ui/react';
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../../api/axios";


export default function TableComponent(props) {
    let data = props.value;
    const [state, setState] = useState({
        value: '',
        copied: false,
    })
    const [headers, setHeaders] = useState({
        "Content-Type": "application/json",
        "Authorization": ""
    })

    useEffect(() => {
        let auth_token = localStorage.getItem('auth_token')
        setHeaders((prev) => ({
            ...prev,
            Authorization: `Bearer ${auth_token}`
        }))
    }, [])


    const handleCopy = async (val) => {
        try {
            console.log('headers', headers)
            let response = await axios.post(`post_card/get_token/${val}`, {}, { headers: headers })
            if (response.data.status === true) {
                console.log('response.data.data.link', response.data.data.link)
                setState((prev) => ({
                    ...prev,
                    value: response.data.data.link,
                    copied: true
                }))
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

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
                                        <CopyToClipboard text={state.value}
                                            onCopy={() => {
                                                handleCopy(el._id);
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