import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import Logout from './pages/logout'
import Dashboard from './pages/Dashboard'
import { ProjectPage } from './pages/ProjectList'
import { ProtectedRoute } from './services/ProtectedRoutes'
import Layout from './components/layout'
import { useAuth } from './services/useAuth'

function App() {
  const { user } = useAuth()

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Route>
    </Routes>
  )
}

export default App