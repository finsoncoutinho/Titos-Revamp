import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice'

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity)
  const totalCartPrice = useSelector(getTotalCartPrice)

  // Return null if cart is empty
  if (!totalCartQuantity) return null

  return (
    <div className=' bg-teal-100 text-teal-800 py-4 px-10  text-lg font-semibold flex justify-between fixed bottom-0 left-0 right-0'>
      <p className=' flex gap-8'>
        <span>{totalCartQuantity} vouchers</span>
        <span>&#8377;{totalCartPrice}/-</span>
      </p>
      <Link to='/cart'>Open cart &rarr;</Link>
    </div>
  )
}

export default CartOverview
