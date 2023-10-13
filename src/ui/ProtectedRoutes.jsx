import { useNavigate } from 'react-router-dom'
import { getDataFromLocalStorage } from '../utils/helpers'
import { useEffect } from 'react'

const ProtectedRoutes = ({ children }) => {
  const userDetails = getDataFromLocalStorage('UserDetails')
  const navigate = useNavigate()

  // We check if the user is authenticated
  useEffect(
    function () {
      // If no then we redirect the user to /login ie. <LoginScreen/>
      if (!userDetails?.AuthToken) navigate('/login')
    },
    [userDetails?.AuthToken, navigate]
  )
  // If yes then we return the app screens
  if (userDetails?.AuthToken) return children
}

export default ProtectedRoutes
