/* eslint-disable react/prop-types */
import { HiOutlineLocationMarker } from 'react-icons/hi'
import VoucherItem from './VoucherItem'

const BookingsItem = ({ bookingItem }) => {
  const fakeImage =
    'https://www.lenomex.com/wp-content/uploads/2016/04/dummy-post-horisontal-768x438.jpg'

  return (
    <div className='bg-white w-6/12 m-auto mb-10 p-4 shadow-lg   rounded-3xl  flex flex-col '>
      <div className='      text-teal-800  flex  gap-8 mb-6'>
        <img
          className='h-56 rounded-lg'
          src={fakeImage}
          alt={bookingItem.RestaurantName}
        />
        {/* <img src={bookingItem.ImageUrl[0]} alt={bookingItem.RestaurantName} /> */}
        <div>
          <p className='text-sm font-semibold mb-6 mt-1'>
            {bookingItem.Date} • {bookingItem.Timings}
          </p>
          <h2 className='font-semibold text-3xl mb-2'>
            {bookingItem.CustomerName}
          </h2>
          <p
            className='flex
         gap-2 items-center mb-10 font-medium text-sm'
          >
            <span>
              <HiOutlineLocationMarker size='1.5rem' />
            </span>
            {bookingItem.RestaurantName}
          </p>
          <p className='py-3 px-6 rounded-full text-white text-xl font-semibold bg-teal-600 '>
            Total Price: &#8377;{bookingItem.Amount}
          </p>
        </div>
      </div>

      {bookingItem.VoucherDetails.length > 0 &&
        bookingItem.VoucherDetails.map((voucher, i) => (
          <VoucherItem voucherItem={voucher} key={i} />
        ))}
    </div>
  )
}

export default BookingsItem
