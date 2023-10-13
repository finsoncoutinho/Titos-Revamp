/* eslint-disable no-unused-vars */
import axios from 'axios'
import { getDataFromLocalStorage } from '../utils/helpers'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'

const Header = () => {
  const userDetails = getDataFromLocalStorage('UserDetails')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('UserDetails')
    navigate('/login')
  }

  // const handleLogout = async () => {
  //   try {
  //     const response = await axios({
  //       method: 'post',
  //       url: `${import.meta.env.VITE_URL}/device/userlogout`,
  //       headers: {
  //         AuthToken: userDetails.AuthToken,
  //         Authorization: `${import.meta.env.VITE_AUTHORIZATION}`,
  //         AppVersion: `${import.meta.env.VITE_APPVERSION}`,
  //       },
  //       data: {
  //         UserRef: userDetails.CustomerRef,
  //       },
  //     })
  //     console.log(response.data)
  //     localStorage.removeItem('UserDetails')
  //     navigate('/login')
  //   } catch (error) {
  //     console.log('Logout failed', error.message)
  //   }
  // }

  return (
    <header
      className='bg-teal-100 py-2 px-10 flex
    justify-between'
    >
      <Link to='/' className='text-teal-700 text-4xl font-black'>
        Titos Revamp
      </Link>
      <div className='flex'>
        <Link
          className='flex gap-2 items-center text-lg font-bold text-teal-700 py-2 px-4 hover:text-white hover:bg-teal-700 rounded-lg  active:bg-teal-800'
          to='/bookings'
        >
          Bookings
        </Link>
        <button
          className='flex gap-2 items-center text-lg font-bold text-teal-700 py-2 px-4 hover:text-white hover:bg-teal-700 rounded-lg  active:bg-teal-800'
          onClick={handleLogout}
        >
          Logout
          <HiOutlineLogout size='1.5rem' />
        </button>
      </div>
    </header>
  )
}

export default Header
