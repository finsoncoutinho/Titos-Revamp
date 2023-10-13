import { Link } from 'react-router-dom'

const PageNotFoundScreen = () => {
  return (
    <div className='flex gap-4 flex-col justify-center items-center  bg-slate-100 h-screen'>
      <h1 className='text-8xl font-extralight'>404</h1>
      <p className='text-lg font-semibold'>Something went wrong!</p>
      <Link
        className='px-4 mt-10 py-2 bg-teal-400 rounded-lg hover:bg-teal-500 active:bg-teal-600 text-lg font-medium'
        to='/'
      >
        Back home
      </Link>
    </div>
  )
}

export default PageNotFoundScreen
