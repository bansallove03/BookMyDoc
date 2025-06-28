import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)
  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          setAToken(data.token)
          localStorage.setItem('aToken', data.token)
          navigate('/admin-dashboard')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
          navigate('/doctor-dashboard')
        } else {
          toast.error(data.message)
        }
      }
    } catch (err) {
      console.error(err)
      toast.error("Login failed. Please try again.")
    }
  }

  return (
   <div className="min-h-[80vh] flex items-center justify-center bg-gray-100">
  <div className="relative w-[340px] sm:w-96 h-fit overflow-hidden border rounded-xl shadow-lg bg-white">
    <div
      className={`flex transition-transform duration-500 ease-in-out`}
      style={{
        transform: state === 'Admin' ? 'translateX(0%)' : 'translateX(-50%)',
        width: '200%',
      }}
        >
          {/* Admin Login */}
          <form onSubmit={onSubmitHandler} className='w-full flex flex-col gap-3 items-start p-8 text-[#5E5E5E] text-sm bg-white'>
            <p className='text-2xl font-semibold m-auto'><span className='text-primary'>Admin</span> Login</p>
            <div className='w-full'>
              <p>Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
            </div>
            <div className='w-full'>
              <p>Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
            </div>
            <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
            <p>Doctor Login? <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer'>Click here</span></p>
          </form>

          {/* Doctor Login */}
          <form onSubmit={onSubmitHandler} className='w-full flex flex-col gap-3 items-start p-8 text-[#5E5E5E] text-sm bg-white'>
            <p className='text-2xl font-semibold m-auto'><span className='text-primary'>Doctor</span> Login</p>
            <div className='w-full'>
              <p>Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
            </div>
            <div className='w-full'>
              <p>Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
            </div>
            <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
            <p>Admin Login? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>Click here</span></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
