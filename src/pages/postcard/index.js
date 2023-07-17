import React, { useState, useEffect } from "react";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Box,
    useColorModeValue,
    FormErrorMessage,
    HStack,
} from '@chakra-ui/react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { CardLayout } from "../../components/card/index";
import Editor from "../../components/editor/index";
import axios from "../../api/axios";
// import 'quill/dist/quill.snow.css';
import TableComponent from "../../components/table";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function PostCard() {
    const [posts, setPosts] = useState([])
    var headers;
    const formik = useFormik({
        initialValues: {
            recipient: "",
            street_1: "",
            street_2: "",
            city: "",
            state: "",
            zipcode: "",
            message: ""
        },

        validationSchema: Yup.object({
            recipient: Yup.string().required("Recipient field is Required"),
            street_1: Yup.string().required("Street field is Required"),
            city: Yup.string().required("City field is Required"),
            state: Yup.string().required("State field is Required"),
            message: Yup.string().required("messsage field is Required"),
            zipcode: Yup.string().matches(/^[0-9]{6}$/, 'Invalid zipcode')
        }),

        onSubmit: async (values, actions) => {
            try {

                let response = await axios.post('post_card/create',
                    JSON.stringify(values), {
                    headers: headers,
                })
                if (response.data.status === true) {
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
                formik.setFieldValue('message', '')
                actions.resetForm();
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    })

    async function getpostdata() {
        try {
            let response = await axios.get('post_card/getall', {
                headers: headers
            })
            if (response.data.status === true) {
                setPosts((prev) => ([
                    ...prev,
                    ...response.data.data
                ]))
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        let auth_token = localStorage.getItem('auth_token')
            headers = {
                'Content-Type': "application/json",
                "Authorization": `Bearer ${auth_token}`
            }
            getpostdata();
    }, [])



    return (
        <div>
            <Stack style={{ width: "80%", margin: "auto" }} direction={{ base: 'column', md: 'row' }}>
                <Flex
                    minH={'100vh'}
                    align={'center'}
                    justify={'center'}
                    bg={useColorModeValue('gray.50', 'gray.800')}>
                    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                        <Stack align={'center'}>
                            <Heading fontSize={'4xl'} textAlign={'center'}>
                                ePostCard.tech
                            </Heading>
                        </Stack>
                        <Box
                            rounded={'lg'}
                            bg={useColorModeValue('white', 'gray.700')}
                            boxShadow={'lg'}
                            p={8}>
                            <Stack as="form" onSubmit={formik.handleSubmit} spacing={4}>
                                <FormControl id="recipient" isInvalid={formik.errors.recipient} isRequired>
                                    <FormLabel>Recipient Name</FormLabel>
                                    <Input
                                        type="text"
                                        name="recipient"
                                        onChange={formik.handleChange}
                                        value={formik.values.recipient}
                                    />
                                    <FormErrorMessage>{formik.errors.recipient}</FormErrorMessage>
                                </FormControl>

                                <FormControl id="street_1" isInvalid={formik.errors.street_1} isRequired>
                                    <FormLabel>Street 1</FormLabel>
                                    <Input
                                        type="text"
                                        name="street_1"
                                        onChange={formik.handleChange}
                                        value={formik.values.street_1}
                                    />
                                    <FormErrorMessage>{formik.errors.street_1}</FormErrorMessage>
                                </FormControl>
                                <HStack>
                                    <Box>
                                        <FormControl id="street_2" >
                                            <FormLabel>Street 2</FormLabel>
                                            <Input
                                                type="text"
                                                name="street_2"
                                                onChange={formik.handleChange}
                                                value={formik.values.street_2}
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl id="city" isInvalid={formik.errors.city} isRequired>
                                            <FormLabel>City</FormLabel>
                                            <Input
                                                type="text"
                                                name="city"
                                                onChange={formik.handleChange}
                                                value={formik.values.city} />
                                            <FormErrorMessage>{formik.errors.city}</FormErrorMessage>
                                        </FormControl>
                                    </Box>
                                </HStack>

                                <HStack>
                                    <Box>
                                        <FormControl id="state" isInvalid={formik.errors.state} isRequired>
                                            <FormLabel>State</FormLabel>
                                            <Input
                                                type="text"
                                                name="state"
                                                onChange={formik.handleChange}
                                                value={formik.values.state} />
                                            <FormErrorMessage>{formik.errors.state}</FormErrorMessage>
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl id="zipcode" isInvalid={formik.errors.zipcode} isRequired>
                                            <FormLabel>ZipCode</FormLabel>
                                            <Input
                                                type="text"
                                                name="zipcode"
                                                onChange={formik.handleChange}
                                                value={formik.values.zipcode} />
                                            <FormErrorMessage>{formik.errors.zipcode}</FormErrorMessage>
                                        </FormControl>
                                    </Box>
                                </HStack>
                                <FormControl id="message" isRequired>
                                    <FormLabel>Message</FormLabel>
                                    <Editor onValue={(value) => {
                                        formik.setFieldValue('message', value)
                                    }} />
                                </FormControl>

                                <Stack spacing={10} pt={2}>
                                    <Button
                                        type="submit"
                                        loadingText="Submitting"
                                        size="lg"
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                        save
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Flex>
                <Box>
                    <CardLayout value={formik.values} />
                </Box>
                <ToastContainer autoClose={3000} theme="colored" />
            </Stack>
            <Stack style={{ width: "80%", margin: "auto" }} direction={{ base: 'column', md: 'row' }}>
                <TableComponent value={posts} />
            </Stack>

        </div>
    );
}