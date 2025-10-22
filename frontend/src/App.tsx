import { Route, Routes, Navigate } from 'react-router'
import Login from './pages/Login'
import Logout from './pages/logout'
import Dashboard from './pages/Dashboard'
import { ProtectedRoute } from './services/ProtectedRoutes'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/logout"
        element={
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  )
}

export default App