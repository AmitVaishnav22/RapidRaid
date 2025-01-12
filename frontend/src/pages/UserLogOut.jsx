import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function UserLogOut() {
    const token=localStorage.getItem('token')
    const navigate=useNavigate()
    axios.get(`$${import.meta.env.VITE_BASE_URL}/user/logout`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }).then((response)=>{
        if(response.status===200){
            localStorage.removeItem('token')
            navigate('/user-login')
        }
    })
  return (
    <div>UserLogOut</div>
  )
}

export default UserLogOut    