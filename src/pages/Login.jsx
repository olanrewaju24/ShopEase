import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null); setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto card p-6">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="border rounded-xl w-full px-3 py-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="border rounded-xl w-full px-3 py-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button disabled={loading} className="btn w-full">{loading ? 'Logging in…' : 'Login'}</button>
      </form>
      <p className="text-sm text-gray-600 mt-3">No account? <Link to="/signup" className="underline">Sign up</Link></p>
    </div>
  )
}
