import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginScreen from './pages/LoginScreen'
import HomeScreen from './pages/HomeScreen'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='login' element={<LoginScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
