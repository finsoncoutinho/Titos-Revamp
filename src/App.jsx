import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LoginScreen from './features/Auth/LoginScreen'
import EventsListScreen from './features/EventsList/EventsListScreen'
import AppLayout from './ui/AppLayout'
import BookingsHistoryScreen from './features/BookingHistory/BookingsHistoryScreen'
import EventDetailsScreen from './features/EventDetails/EventDetailsScreen'
import CartScreen from './features/cart/CartScreen'
import OrderScreen from './features/order/OrderScreen'
import ProtectedRoutes from './ui/ProtectedRoutes'
import PageNotFoundScreen from './features/pageNotFound.jsx/pageNotFoundScreen'

// We wraped <OrderScreen/> and <AppLayout/> with ProtectedRoutes inorder to prevent non-authorized users from accessing the application

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<LoginScreen />} />
        <Route
          path='/booking/:BookingRef'
          element={
            <ProtectedRoutes>
              <OrderScreen />
            </ProtectedRoutes>
          }
        />
        <Route
          element={
            <ProtectedRoutes>
              <AppLayout />
            </ProtectedRoutes>
          }
        >
          <Route path='/' element={<EventsListScreen />} />
          <Route path='/event/:eventRef' element={<EventDetailsScreen />} />
          <Route path='/cart' element={<CartScreen />} />
          <Route path='bookings' element={<BookingsHistoryScreen />} />
        </Route>
        <Route path='*' element={<PageNotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
