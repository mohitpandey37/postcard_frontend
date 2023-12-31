import React, { useEffect, useState } from 'react';
import { CardLayout } from '../../components/card';
import { useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import { ToastContainer, toast } from 'react-toastify';


export default function Preview() {
    const [data, setData] = useState({});
    const location = useLocation();
    const path = location.pathname.split("/");
    const postId = path[path.length - 1];
    const [headers, setHeaders] = useState({
        "Content-Type": "application/json",
        "Authorization": ""
    });

    async function getPostData() {
        try {
            let response = await axios.get(`post_card/get_data/${postId}`, {
                headers: headers
            })
            if (response.data.status === true) {
                console.log(response.data.data)
                setData((prev) => ({
                    ...response.data.data
            }))
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
        setHeaders((prev) => ({
            ...prev,
            Authorization: `Bearer ${auth_token}`
        }))
        getPostData()
    }, [])

    return (
        <div>
            <CardLayout value={data} />
            <ToastContainer autoClose={3000} theme="colored" />
        </div>
    )
}