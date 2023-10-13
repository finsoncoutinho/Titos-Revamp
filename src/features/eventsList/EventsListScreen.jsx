/* eslint-disable no-unused-vars */
import { useState } from 'react'
import axios from 'axios'
import { HiSearch } from 'react-icons/hi'
import { formatDate, getDataFromLocalStorage } from '../../utils/helpers'
import EventItem from './EventItem'

const EventsListScreen = () => {
  //   const [date, setDate] = useState('31-12-2021')
  const [date, setDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)
  const [events, setEvents] = useState([])
  const userDetails = getDataFromLocalStorage('UserDetails')

  const getAllEventsPublished = async (e) => {
    e.preventDefault()

    if (!date || isLoading) return

    const formatedDate = formatDate(new Date(date))

    try {
      setIsLoading(true)
      const response = await axios({
        method: 'get',
        url: `${
          import.meta.env.VITE_URL
        }/customer/getallpublishedevents?Date=${formatedDate}`,
        // url: `${
        //   import.meta.env.VITE_URL
        // }/customer/getallpublishedevents?Date=04-04-2022`,
        headers: {
          AuthToken: userDetails.AuthToken,
          Authorization: `${import.meta.env.VITE_AUTHORIZATION}`,
          AppVersion: `${import.meta.env.VITE_APPVERSION}`,
        },
      })

      setEvents(response.data.Details)
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className='  pt-10 mb-20'>
      <div className='flex gap-4 items-center py-4 px-20 bg-teal-600  max-w-2xl rounded-2xl mx-auto'>
        <h2 className='font-bold text-white'>Search events by date: </h2>
        <input
          className='px-8 py-2 bg-white text-teal-900 rounded-lg'
          type='date'
          id='date'
          value={date}
          placeholder='dd-mm-yyyy'
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          onClick={getAllEventsPublished}
          className='bg-white py-3 px-6  rounded-2xl  text-teal-900 hover:bg-teal-100 active:bg-teal-200'
        >
          <HiSearch size='1.5rem' />
        </button>
      </div>

      {/* Returns this jsx when the event list is empty */}
      {events.length === 0 && (
        <div className='flex justify-center mt-16 text-teal-600'>
          <h3 className='font-bold text-4xl '> No events found</h3>
        </div>
      )}

      {events.length > 0 &&
        events.map((event) => (
          <EventItem eventItem={event} key={event.PublishedEventRef} />
        ))}
    </main>
  )
}

export default EventsListScreen
