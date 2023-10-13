/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux'
import {
  decreseVoucherQuantity,
  increseVoucherQuantity,
} from '../features/cart/cartSlice'

function UpdateVoucherQuantity({ currentQuantity, Type, btnType }) {
  const dispatch = useDispatch()
  return (
    <div className='flex items-center gap-2 '>
      <button
        className={`${
          btnType === 'small'
            ? 'py-1 px-3 bg-teal-400 rounded-full'
            : 'py-2 px-4 text-lg font-bold bg-white rounded-full'
        }`}
        onClick={() => dispatch(decreseVoucherQuantity(Type))}
      >
        -
      </button>
      <span
        className={`${
          btnType === 'small' ? ' font-semibold' : ' text-xl font-bold'
        }`}
      >
        {currentQuantity}
      </span>
      <button
        className={`${
          btnType === 'small'
            ? 'py-1 px-3 bg-teal-400 rounded-full'
            : 'py-2 px-4 text-lg font-bold bg-white rounded-full'
        }`}
        onClick={() => dispatch(increseVoucherQuantity(Type))}
      >
        +
      </button>
    </div>
  )
}

export default UpdateVoucherQuantity
