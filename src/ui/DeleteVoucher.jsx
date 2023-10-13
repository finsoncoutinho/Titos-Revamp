/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux'
import { deleteVoucher } from '../features/cart/cartSlice'

function DeleteVoucher({ Type, btnType }) {
  const dispatch = useDispatch()

  return (
    <button
      className={`${
        btnType === 'small'
          ? 'bg-teal-400 text-lg py-1 px-4 rounded-full font-medium'
          : ' bg-white h-14 text-xl hover:bg-slate-100 active:bg-slate-200 font-bold px-8 rounded-full'
      }`}
      onClick={() => dispatch(deleteVoucher(Type))}
    >
      Delete
    </button>
  )
}

export default DeleteVoucher
