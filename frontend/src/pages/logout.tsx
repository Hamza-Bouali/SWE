import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../services/useAuth' // added


export default function Logout() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 to-slate-100">
      <Container />
    </div>
  )
}

function Container() {
    const {logout} = useAuth() 
    const [loading,setLoading] = useState(false)
    

    function handleClick()
    {
        try{
            setLoading(true)
            logout()
        }
        catch(e )
        {
            console.log("an error ",e)
        }
        finally{
            setLoading(false)
        }
    }

  return (
    <div className="w-full max-w-md bg-white/90 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
      <div className="px-8 py-10">
        <div className="mb-6 text-center">
          <img
            alt="Logo"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="mx-auto h-10 w-auto mb-4"
          />
          <h1 className="text-2xl font-semibold text-slate-800">Sign out</h1>
          <p className="text-sm text-slate-500 mt-1">see you next time.</p>
        </div>

        <div>
        <button
          type="submit"
          className={`w-full inline-flex items-center justify-center py-2 rounded-lg text-sm font-medium text-white shadow-sm transition-colors ${loading ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          disabled={loading}
          onClick={handleClick}
        >
          {loading ? 'loggin out...' : 'Log out'}
        </button>
      </div>


        
      </div>

      <div className="border-t border-slate-100 px-8 py-4 bg-gradient-to-t from-white/50">
        <p className="text-xs text-center text-slate-400">By continuing you agree to our Terms of Service and Privacy Policy.</p>
      </div>
    </div>
  )
}

function Form() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {logout} = useAuth() 

  function validate() {
    if (!email.trim()) return 'Email is required'
    if (!/^\S+@\S+\.\S+$/.test(email)) return 'Please enter a valid email'
    if (password.length < 6) return 'Password must be at least 6 characters'
    return null
  }

   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    try {
      await Logout()
      navigate('/login')
    } catch (err: any) {
      setError(err?.message || 'Failed to log out')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-md bg-red-50 border border-red-100 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      

      <div>
        <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-1">
          <span>Password</span>
          <button
            type="button"
            className="text-xs text-indigo-600 hover:underline"
            onClick={() => setShowPassword((s) => !s)}
            aria-pressed={showPassword}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          </span>
          <input
            type={showPassword ? 'text' : 'password'}
            className="block w-full pl-10 pr-3 py-2 border rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
          <span className="text-slate-600">Remember me</span>
        </label>
        <Link to="/forgot-password" className="text-indigo-600 hover:underline">
          Forgot?
        </Link>
      </div>

      <div>
        <button
          type="submit"
          className={`w-full inline-flex items-center justify-center py-2 rounded-lg text-sm font-medium text-white shadow-sm transition-colors ${loading ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </div>

      <div className="relative text-center py-2">
        <span className="text-xs text-slate-400 bg-white px-3">or continue with</span>
      </div>

      
    </form>
  )
}