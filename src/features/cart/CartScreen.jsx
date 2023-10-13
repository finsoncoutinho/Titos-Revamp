/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
  clearCart,
  getCart,
  getClubRef,
  getEventRef,
  getTotalCartPrice,
} from './cartSlice'
import CartItem from './CartItem'
import { getDataFromLocalStorage } from '../../utils/helpers'

const CartScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userDetails = getDataFromLocalStorage('UserDetails')
  const cart = useSelector(getCart)
  const PublishedEventRef = useSelector(getEventRef)
  const ClubReference = useSelector(getClubRef)
  const totalCartPrice = useSelector(getTotalCartPrice)

  const handleValidateVouchers = async () => {
    // Removing totalPrice feild from our cartItem
    const vouchers = cart.map((voucher) => {
      return {
        VoucherName: voucher.Type,
        Amount: voucher.Amount,
        Quantity: voucher.Quantity,
      }
    })

    // Preparing the body for post request
    const dataObj = {
      ClubReference,
      PublishedEventRef,
      VoucherDetails: vouchers,
      PromoRef: null,
    }

    try {
      const response = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_URL}/customer/validateeventbooking`,
        headers: {
          AuthToken: userDetails.AuthToken,
          Authorization: `${import.meta.env.VITE_AUTHORIZATION}`,
          AppVersion: `${import.meta.env.VITE_APPVERSION}`,
        },
        data: dataObj,
      })

      // We are passing the bookingRefrence from the response of validateEventBooking in url as param inorder to be used in the orderScreen
      const bookingRef = response.data.Details.BookingReference
      navigate(`/booking/${bookingRef}`)
    } catch (err) {
      console.log(err.message)
    }
  }

  // Return if the cart is empty
  if (!cart.length)
    return (
      <div className='w-fit m-auto mt-20'>
        <p className='text-lg font-semibold'>
          Your cart is empty. Start adding some vouchers :)
        </p>
      </div>
    )

  return (
    <div className='py-10 mx-96 '>
      <button
        className='text-lg font-semibold text-teal-800'
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </button>
      <h2 className='mt-7 text-xl font-semibold'>Your cart</h2>
      <ul className='mt-3 divide-y divide-stone-200 border-b'>
        {cart.map((voucher) => (
          <CartItem voucher={voucher} key={voucher.Type} />
        ))}
      </ul>
      <div className='flex items-center gap-4  px-8 mt-4 mb-10'>
        <p className='text-lg font-medium'>Total Amount:</p>
        <p className='text-2xl font-extrabold'>&#8377;{totalCartPrice}</p>
      </div>

      <div className='mt-6 space-x-2'>
        <button
          onClick={handleValidateVouchers}
          className=' bg-teal-400 py-2 px-4 rounded-full text-lg font-semibold hover:bg-teal-500 active:bg-teal-600'
        >
          Validate vouchers
        </button>

        <button
          className='py-2 px-4 rounded-full border-2 border-slate-300 text-slate-400 text-lg font-semibold hover:bg-slate-300 hover:text-slate-900 active:bg-slate-400 '
          onClick={() => dispatch(clearCart())}
        >
          Clear cart
        </button>
      </div>
    </div>
  )
}

export default CartScreen
