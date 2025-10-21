import { useState } from 'react'
import Header from './components/header'
import { Route,Routes, Link } from 'react-router'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route index path='login' element={<Login/>}/>
      <Route path='dashboard' element={<Dashboard/>}/>
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  )
}

export default App
