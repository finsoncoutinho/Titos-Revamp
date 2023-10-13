/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { addVoucher, getCurrentQuantityByType } from '../cart/cartSlice'
import UpdateVoucherQuantity from '../../ui/UpdateVoucherQuantity'
import DeleteVoucher from '../../ui/DeleteVoucher'

const Voucher = ({ voucher, clubRef, eventRef }) => {
  const dispatch = useDispatch()
  const currentQuantity = useSelector(getCurrentQuantityByType(voucher.Type))

  const isInCart = currentQuantity > 0

  function handleAddToCart() {
    // Prepared the newItem in the cart item stucture
    const newItem = {
      Type: voucher.Type,
      Amount: voucher.Amount,
      Quantity: 1,
      totalPrice: voucher.Amount * 1,
    }

    dispatch(addVoucher({ newItem, clubRef, eventRef }))
  }
  return (
    <div className='bg-teal-500 rounded-2xl py-8 px-12  mb-6  flex items-center justify-between'>
      <div className='flex flex-col  gap-4   text-slate-900'>
        <p className='text-3xl font-extrabold bg-teal-100 w-fit py-2 px-4 rounded-full'>
          <span>{voucher.Type} Voucher</span>
        </p>
        <p className='text-2xl font-semibold px-4'>
          Only &#8377;<span>{voucher.Amount}/-</span>
        </p>
      </div>
      {isInCart ? (
        <div className='flex items-center gap-3 sm:gap-8'>
          <UpdateVoucherQuantity
            Type={voucher.Type}
            currentQuantity={currentQuantity}
          />
          <DeleteVoucher Type={voucher.Type} />
        </div>
      ) : (
        <button
          className=' bg-white h-14 text-xl hover:bg-slate-100 active:bg-slate-200 font-bold px-8 rounded-full'
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      )}
    </div>
  )
}

export default Voucher
