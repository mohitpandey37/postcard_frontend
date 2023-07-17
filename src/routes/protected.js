import { useEffect } from "react";
import { LInk, useNavigate } from "react-router-dom";


export default function Protected(props) {
    const { Component } = props;
    const navigate = useNavigate();


    useEffect(() => {
        let login = localStorage.getItem("login");
        if (!login) {
            navigate('/')
        }
    })


    return (
        <div>
            <Component />
        </div>
    )
}