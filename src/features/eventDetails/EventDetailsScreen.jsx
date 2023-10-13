/* eslint-disable no-extra-semi */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDataFromLocalStorage } from '../../utils/helpers'
import axios from 'axios'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import Voucher from './Voucher'

const EventDetailsScreen = () => {
  const [eventDetails, setEventDetails] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { eventRef } = useParams()
  const userDetails = getDataFromLocalStorage('UserDetails')

  const fakeImage =
    'https://www.lenomex.com/wp-content/uploads/2016/04/dummy-post-horisontal-768x438.jpg'

  useEffect(() => {
    ;(async function () {
      try {
        setIsLoading(true)
        const response = await axios({
          method: 'get',
          url: `${
            import.meta.env.VITE_URL
          }/customer/getpublishedeventdetails?publishedeventref=${eventRef}`,
          headers: {
            // AuthToken: 'bd8382d5-3adf-11eb-9263-b62d5e046812',
            AuthToken: userDetails.AuthToken,
            Authorization: `${import.meta.env.VITE_AUTHORIZATION}`,
            AppVersion: `${import.meta.env.VITE_APPVERSION}`,
          },
        })

        setEventDetails(response.data.Details)
      } catch (error) {
        console.log(error.message)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [eventRef, userDetails.AuthToken])

  // Returns this component when the data is being fetched
  if (isLoading) {
    return (
      <div className='flex justify-center mt-32 text-teal-600'>
        <h3 className='font-bold text-4xl '>Loading......</h3>
      </div>
    )
  }

  return (
    <main className='bg-white m-auto w-fit text-slate-800 p-10 mb-10 px-10 flex justify-center items-center '>
      <div className=' px-16 pt-6 '>
        <div className=' flex  gap-16 mb-10 '>
          <img
            className='h-96   bg-red-50 rounded-2xl '
            src={fakeImage}
            alt=''
          />
          {/* <img src={eventDetails.EventDetails.Thumbnail} alt='' /> */}

          <div className='shadow-lg p-4 rounded-2xl bg-teal-500'>
            <img className='h-56 rounded-t-xl mb-2' src={fakeImage} alt='' />
            {/* <img src={eventDetails.ClubDetails.ImageUrl} alt='' /> */}

            <h1 className='text-lg font-bold'>
              {eventDetails?.ClubDetails?.Name}
            </h1>
            <p className='text-sm font-medium mt-1 flex gap-2 items-center mb-6 break-all  w-96'>
              <HiOutlineLocationMarker size='1.5rem' />
              {eventDetails?.ClubDetails?.Address}
            </p>

            <a
              className='bg-white py-2 px-36 mx-2 text-center text-lg font-medium rounded-2xl '
              href={`https://maps.google.com/?q=${eventDetails?.ClubDetails?.Latitude},${eventDetails?.ClubDetails?.Longitude}`}
              target='_blank'
              rel='noreferrer'
            >
              Open map
            </a>
          </div>
        </div>
        <div className='w-9/12'>
          <div className='flex gap-2 mb-4'>
            {eventDetails?.EventDetails?.ImageURL.split(',').map(
              (imgUrl, i) => (
                <img className='h-20 rounded-lg' src={fakeImage} key={i} />
                // <img src={imgUrl} key={i} />
              )
            )}
          </div>
          <p className='text-sm font-semibold bg-teal-300 text-teal-900 w-64 text-center rounded-xl p-2 mb-4'>
            {eventDetails?.EventDetails?.Date} •{' '}
            {eventDetails?.EventDetails?.Timings}
          </p>
          <div className='mb-6 '>
            <h2 className='font-bold text-lg'>Details:</h2>
            {eventDetails?.EventDetails?.Description?.split('- ')
              .slice(1)
              .map((item, i) => (
                <p className='font-medium mb-1' key={i}>
                  - {item}
                </p>
              ))}
          </div>
          <div className='mb-4'>
            <h2 className='font-bold text-lg'> Cancellation Policy:</h2>
            <p className='font-medium mb-1'>
              {eventDetails?.EventDetails?.CancellationPolicy}
            </p>
          </div>
          <div>
            <h2 className='font-bold text-lg'> Tearms & Conditions:</h2>

            {eventDetails?.EventDetails?.TermsAndConditions.split('\n').map(
              (item, i) => (
                <p className='font-medium mb-1' key={i}>
                  {item}
                </p>
              )
            )}
          </div>
        </div>
        <div className='mt-14'>
          <h1 className='text-lg font-bold mb-4'>Vouchers:</h1>
          <p className='mb-4'>
            <span className='font-semibold'>Category:</span>{' '}
            <span className='bg-red-100 py-1 px-2 rounded-md '>
              {eventDetails?.VoucherDetails?.CategoryName}
            </span>
          </p>
          {eventDetails?.VoucherDetails?.Details.map((voucher, i) => (
            <Voucher
              voucher={voucher}
              eventRef={eventRef}
              clubRef={eventDetails?.ClubDetails?.ClubReference}
              key={i}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

export default EventDetailsScreen
