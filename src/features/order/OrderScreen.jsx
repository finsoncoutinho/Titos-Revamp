/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { clearCart, getCart, getClubRef, getEventRef } from '../cart/cartSlice'
import { getDataFromLocalStorage } from '../../utils/helpers'
import Header from '../../ui/Header'

const OrderScreen = () => {
  const dispatch = useDispatch()
  const { BookingRef } = useParams()
  const navigate = useNavigate()
  const userDetails = getDataFromLocalStorage('UserDetails')
  const cart = useSelector(getCart)
  const PublishedEventRef = useSelector(getEventRef)
  const ClubReference = useSelector(getClubRef)

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

  const handleBookingOrder = () => {
    dispatch(clearCart())
    navigate('/')
  }

  // const handleBookingOrder = async () => {
  //   try {
  //     const response = await axios({
  //       method: 'post',
  //       url: `${import.meta.env.VITE_URL}/customer/placebooking`,
  //       headers: {
  //         AuthToken: userDetails.AuthToken,
  //         Authorization: `${import.meta.env.VITE_AUTHORIZATION}`,
  //         AppVersion: `${import.meta.env.VITE_APPVERSION}`,
  //       },
  //       data: dataObj,
  //     })

  //   } catch (err) {
  //     console.log(err.message)
  //   }
  // }

  return (
    <div>
      <Header />
      <div className='p-10 mt-10 flex gap-10 flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold'>
          Your voucher&apos;s validation is successfull
        </h1>
        <button
          onClick={handleBookingOrder}
          className='bg-teal-400 py-4 px-8 rounded-full text-lg font-bold hover:bg-teal-500 active:bg-teal-600'
        >
          Place Order
        </button>
      </div>
    </div>
  )
}

export default OrderScreen
