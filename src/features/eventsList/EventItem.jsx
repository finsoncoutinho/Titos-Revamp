/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { HiOutlineLocationMarker } from 'react-icons/hi'

const EventItem = ({ eventItem }) => {
  const fakeImage =
    'https://www.lenomex.com/wp-content/uploads/2016/04/dummy-post-horisontal-768x438.jpg'

  return (
    <div className='flex gap-4 bg-white  p-6 text-teal-800 rounded-3xl shadow-lg w-6/12 m-auto mt-10'>
      <img
        className='h-64 w-96 rounded-2xl'
        src={fakeImage}
        alt={eventItem.EventName}
      />
      {/* <img src={eventItem.Thumbnail} alt={eventItem.EventName} /> */}
      <div className='p-2 px-4'>
        <p className='text-sm font-semibold mb-6'>
          {eventItem.Date} • {eventItem.Timings}
        </p>
        <div className='flex flex-col justify-between '>
          <h2 className='font-semibold text-xl mb-2'>{eventItem.EventName}</h2>
          <p
            className='flex
         gap-2 items-center  font-medium text-sm'
          >
            <span>
              <HiOutlineLocationMarker size='1.5rem' />
            </span>
            {eventItem.ClubName}
          </p>
          <Link
            to={`/event/${eventItem.PublishedEventRef}`}
            className='py-4 px-16 m-7 rounded-lg text-white text-xl font-semibold bg-teal-600 hover:bg-teal-700 active:bg-teal-800'
          >
            Attend
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventItem
