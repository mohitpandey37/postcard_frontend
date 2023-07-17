import React, {useEffect} from "react";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    FormErrorMessage,
} from '@chakra-ui/react';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../api/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const navigate = useNavigate();

   function updateSession(data){
    for (const [key] of Object.entries(data)) {
        if (data[`${key}`] !== "") {
            localStorage.setItem(key, data[key]);
        }
    } 
   }

//   useEffect(()=>{
//     let login = localStorage.getItem("login");
//     if(!login){
//         navigate('/' );
//     } else {
//         navigate('/postcard');
//     }
//   })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        validationSchema: Yup.object({
            email: Yup.string().required("Email Required").email("Invalid email"),
            password: Yup.string().required("Password Required").matches(/^[0-9]{6}$/, 'Password must of 6 digits')
        }),

        onSubmit: async (values, actions) => {
            try {
                let response = await axios.post('login',
                    JSON.stringify(values), {
                    headers: { 'Content-Type': "application/json" },
                })
                if (response.data.status === true) {
                    updateSession({...response.data.data, login: true})
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
                actions.resetForm();
                navigate('/postcard');

            } catch (error) {
                console.log("error", error)
                toast.error(error.response.data.message);
            }
        }
    })
    return (
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack as="form" onSubmit={formik.handleSubmit} spacing={4}>
                            <FormControl id="email" isInvalid={formik.errors.email}>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    name="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                            </FormControl>
                            <FormControl id="password" isInvalid={formik.errors.password}>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                </Stack>
                                <Button
                                    type='submit'
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
                <ToastContainer autoClose={3000} theme="colored"/>
            </Flex>
    );
}