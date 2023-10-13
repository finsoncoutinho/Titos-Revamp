/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import { getCurrentQuantityByType } from './cartSlice'
import UpdateVoucherQuantity from '../../ui/UpdateVoucherQuantity'
import DeleteVoucher from '../../ui/DeleteVoucher'

function CartItem({ voucher }) {
  const currentQuantity = useSelector(getCurrentQuantityByType(voucher.Type))

  return (
    <li className='flex justify-between items-center  py-4'>
      <p className=''>
        {voucher.Quantity} &times; {voucher.Type}
      </p>
      <div className='flex gap-8 items-center'>
        <p className='font-semibold'>&#8377;{voucher.totalPrice}/-</p>
        <UpdateVoucherQuantity
          Type={voucher.Type}
          btnType='small'
          currentQuantity={currentQuantity}
        />
        <DeleteVoucher btnType='small' Type={voucher.Type} />
      </div>
    </li>
  )
}

export default CartItem
