import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {setCaptain} from "../store/captainSlice.js"
import axios from 'axios'

function CaptainSignUp() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ CaptainFullName, setCaptainFullName ] = useState('')
    const [ vehicleColor, setVehicleColor ] = useState('')
    const [ vehiclePlate, setVehiclePlate ] = useState('')
    const [ vehicleCapacity, setVehicleCapacity ] = useState('')
    const [ vehicleType, setVehicleType ] = useState('')

    const navigate=useNavigate()
    const dispatch = useDispatch()


    const submitHandler = async (e) => {
        e.preventDefault()
        const captainData = {
          fullname: CaptainFullName,
          email: email,
          password: password,
          vehicle: {
            color: vehicleColor,
            plate: vehiclePlate,
            capacity: vehicleCapacity,
            vehicleType: vehicleType
          }
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData);
        
            if (response.status === 200 && response.data?.data?.captain) {
                //console.log('Captain registered successfully:', response.data.data.captain);
              const captain = response.data.data.captain;
              localStorage.setItem('token', response.data.data.token)
              console.log(captain); 
              dispatch(setCaptain(captain));
              navigate('/captain/home');
            } else {
              console.error('Unexpected response structure:', response);
            }
          } catch (error) {
            console.error('Error during registration:', error);
          }
        setEmail('')
        setCaptainFullName('')
        setPassword('')
        setVehicleColor('')
        setVehiclePlate('')
        setVehicleCapacity('')
        setVehicleType('')
    }
    return (
        <div className='py-5 px-5 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-20 mb-3' src="https://yt3.ggpht.com/a/AATXAJwcGY7-bEzvCS-U2UiOLL8DyldZIEXwd63ZQw=s900-c-k-c0xffffffff-no-rj-mo" alt="" />

            <form onSubmit={(e) => {
            submitHandler(e)
            }}>

            <h3 className='text-lg w-full  font-medium mb-2'>What's our Captain's name</h3>
                <input
                required
                className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                type="text"
                placeholder='First name'
                value={CaptainFullName}
                onChange={(e) => {
                    setCaptainFullName(e.target.value)
                }}
                />
            <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
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

            <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
            <div className='flex gap-4 mb-7'>
                <input
                required
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                type="text"
                placeholder='Vehicle Color'
                value={vehicleColor}
                onChange={(e) => {
                    setVehicleColor(e.target.value)
                }}
                />
                <input
                required
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                type="text"
                placeholder='Vehicle Plate'
                value={vehiclePlate}
                onChange={(e) => {
                    setVehiclePlate(e.target.value)
                }}
                />
            </div>
            <div className='flex gap-4 mb-7'>
                <input
                required
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                type="number"
                placeholder='Vehicle Capacity'
                value={vehicleCapacity}
                onChange={(e) => {
                    setVehicleCapacity(e.target.value)
                }}
                />
                <select
                required
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                value={vehicleType}
                onChange={(e) => {
                    setVehicleType(e.target.value)
                }}
                >
                <option value="" disabled>Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
                </select>
            </div>

            <button
                className='bg-[orange] text-black font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            >Create Captain Account</button>

            </form>
            <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
        </div>
        <div>
            <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
        </div>
    )
    }

export default CaptainSignUp