/* eslint-disable no-extra-semi */
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getDataFromLocalStorage } from '../../utils/helpers'
import BookingsItem from './BookingsItem'

const BookingsHistoryScreen = () => {
  const userDetails = getDataFromLocalStorage('UserDetails')
  const [isLoading, setIsLoading] = useState(false)
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    ;(async function () {
      try {
        setIsLoading(true)
        const response = await axios({
          method: 'get',
          url: `${import.meta.env.VITE_URL}/customer/voucherbookinglist`,
          headers: {
            // AuthToken: 'bd8382d5-3adf-11eb-9263-b62d5e046812',
            AuthToken: userDetails.AuthToken,
            Authorization: `${import.meta.env.VITE_AUTHORIZATION}`,
            AppVersion: `${import.meta.env.VITE_APPVERSION}`,
          },
        })

        setBookings(response.data.Details.VoucherBookingList)
      } catch (error) {
        console.log(error.message)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [userDetails.AuthToken])

  return (
    <main className='bg-slate-100   py-12'>
      {isLoading && (
        <div className='flex justify-center mt-32 text-teal-600'>
          <h3 className='font-bold text-4xl '>Loading......</h3>
        </div>
      )}
      {bookings.length === 0 && !isLoading && (
        <div className='flex justify-center mt-32 text-teal-600 '>
          <h3 className='font-bold text-4xl '> No bookings found</h3>
        </div>
      )}

      {bookings.length > 0 &&
        bookings.map((booking, i) => (
          <BookingsItem bookingItem={booking} key={i} />
        ))}
    </main>
  )
}

export default BookingsHistoryScreen
