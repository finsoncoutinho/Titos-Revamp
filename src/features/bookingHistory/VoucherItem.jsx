/* eslint-disable react/prop-types */
const VoucherItem = ({ voucherItem }) => {
  return (
    <p className='px-4 text-slate-500  mb-2 '>
      <span className='text-md font-semibolds'>
        {' '}
        {voucherItem.Quantity} &times;{' '}
      </span>

      <span className=' text-lg font-semibold '>
        {voucherItem.VoucherName}{' '}
      </span>
      <span className='text-normal font-medium'>
        ({voucherItem.CategoryName})
      </span>
    </p>
  )
}

export default VoucherItem
