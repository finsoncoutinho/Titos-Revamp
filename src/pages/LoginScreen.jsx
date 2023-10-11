/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

const LoginScreen = () => {
  const navigate = useNavigate()

  const [phoneNumber, setPhoneNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!phoneNumber || isLoading) return

    try {
      setIsLoading(true)
      const response = await axios({
        method: 'post',
        url: 'http://139.59.63.178:5454/api/customer/iscustomerpresent',
        headers: {
          Authorization: 'SEdRYnN6ZFFFRjpuc0oySXQ0NWt5',
          AppVersion: '1.0.0',
        },
        data: {
          Phone: phoneNumber,
        },
      })
      const authToken = response.data.Details.AuthToken
      localStorage.setItem('AuthToken', JSON.stringify(authToken))
      navigate('/')
    } catch (error) {
      console.log('Login failed', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className=' flex flex-col gap-8 items-center justify-center h-screen bg-slate-50'>
      <form
        className='flex  flex-col items-center gap-4 py-5 px-8 rounded-xl shadow-lg h-90 bg-teal-600 text-teal-50'
        onSubmit={handleLogin}
      >
        <div className='text-center text-3xl mb-4 font-extrabold text-teal-50 flex flex-col gap-1'>
          <h2> Welcome Back </h2>
          <h2>Let&apos;s Log in</h2>
        </div>
        <div className='flex flex-col  gap-1 w-80 mb-2'>
          <label className='font-medium' htmlFor='phoneNumber'>
            Phone number
          </label>
          <input
            type='tel'
            id='phoneNumber'
            disabled={isLoading}
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            className='bg-teal-100 rounded-lg h-10 p-4 text-teal-900'
          />
        </div>

        <button
          disabled={isLoading}
          className='bg-teal-800 py-2 transition duration-150 px-6 rounded-3xl font-semibold  mt-2 mb-4 hover:bg-teal-900'
        >
          Sign in
        </button>
      </form>
    </div>
  )
}

export default LoginScreen
