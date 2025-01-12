import React,{useEffect, useState,} from 'react'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../store/userSlice';
import axios from 'axios';

const UserProtectedWrapper=({children})=>{
    const token = localStorage.getItem('token');
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        if(!token){
            navigate('/user-login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data.captain)
                setLoading(false)
            }
        })
            .catch(err => {

                localStorage.removeItem('token')
                navigate('/user-login')
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
export default UserProtectedWrapper