import React,{useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setCaptain } from '../store/captainSlice'
function CaptainLogin() {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ userData, setUserData ] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      email: email,
      password: password
    }
    //console.log(userData)

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captainData)
      if (response.status === 200 && response.data?.data?.captain) {
            const captain = response.data.data.captain;
            localStorage.setItem('token', response.data.data.token)
            dispatch(setCaptain(captain));
            navigate('/captain/home');
      } else {
          console.error('Unexpected response structure:', response);
      }
    } catch (error) {
      console.log(error);
    }

    setEmail('')
    setPassword('')


  }
  return (
  <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://yt3.ggpht.com/a/AATXAJwcGY7-bEzvCS-U2UiOLL8DyldZIEXwd63ZQw=s900-c-k-c0xffffffff-no-rj-mo" alt="" />

        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
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
            className='bg-[orange] text-black font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</button>

        </form>
        <p className='text-center'>Wanna have your first customer ? <Link to='/captain-signup' className='text-blue-600'>Create new Account</Link></p>
      </div>
      <div>
        <Link
          to='/user-login'
          className='bg-[Black] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin