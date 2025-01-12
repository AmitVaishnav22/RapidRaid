import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/userSlice'
import axios from "axios"

function UserSignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ userFullName, setUserFullName ] = useState('')
  const [ userData, setUserData ] = useState({})

  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname: userFullName,
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUser);
  
      if (response.status === 200 && response.data?.data?.user) {
        const user = response.data.data.user;
        localStorage.setItem('token', response.data.data.token)
        //console.log(user); 
        dispatch(setUser(user));
        navigate('/home');
      } else {
        console.error('Unexpected response structure:', response);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  
    setEmail('')
    setUserFullName('')
    setPassword('')

  }


  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <img className='w-16 mb-10' src="https://th.bing.com/th/id/OIP.tV3YeeVxE0JSFF7GP1ZqJgHaBg?rs=1&pid=ImgDetMain" alt="" />

          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <h3 className='text-lg font-medium mb-2'>What's your name?</h3>
            <input
              required
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              type="text"
              placeholder='Full name'
              value={userFullName}
              onChange={(e) => {
                  setUserFullName(e.target.value)
              }}
            />
            <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              type="email"
              placeholder='email@example.com'
            />
            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
            <input
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              required type="password"
              placeholder='password'
            />

            <button
              className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            >Create account</button>

          </form>
          <p className='text-center'>Already have a account? <Link to='/user-login' className='text-blue-600'>Login here</Link></p>
        </div>
        <div>
          <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
      </div>
    </div >
  )
}

export default UserSignUp