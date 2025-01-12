import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { setCaptain } from '../store/captainSlice';
import axios from 'axios';
const CaptainProtectedWrapped=({children})=> {
    const token = localStorage.getItem('token');
    const navigate=useNavigate()
    const [loading,setLoading]=useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captain`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setCaptain(response.data.captain)
                setLoading(false)
            }
        })
            .catch(err => {

                localStorage.removeItem('token')
                navigate('/captain-login')
            })
    }, [ token ])


    if (loading) {
        return (
            <div>Loading...</div>
        )
    }



    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectedWrapped