import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Login = () => {
  const [searchParams] = useSearchParams()
  const requestedRole = searchParams.get('role') === 'company' ? 'company' : 'jobseeker'
  const [mode, setMode] = useState(searchParams.get('role') ? 'signup' : 'login')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState(requestedRole)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setIsSubmitting(true)

    try {
      if (mode === 'signup' && password !== confirmPassword) {
        throw new Error('Passwords do not match.')
      }

      const endpoint = mode === 'login' ? '/auth/login' : '/auth/signup'
      const payload = mode === 'login'
        ? { username, password }
        : { username, email, password, role }
      const response = await fetch("https://ehtionexa.onrender.com"`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Unable to continue.')

      if (mode === 'signup') {
        setMessage('Account created. Log in with your username and password.')
        setMessageType('success')
        setMode('login')
        setPassword('')
        setConfirmPassword('')
      } else {
        localStorage.setItem('authUser', JSON.stringify(data.user))
        navigate('/dashboard')
      }
    } catch (error) {
      const message = error.name === 'TypeError' && error.message === 'Failed to fetch'
        ? 'Cannot connect to the server. Start the backend with: node server.js'
        : error.message
      setMessage(message)
      setMessageType('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login">
      <h1><b>{mode === 'login' ? 'Login' : 'Create Account'}</b></h1>
      <p>{mode === 'login' ? 'Sign in with your username and password.' : 'Use the same email later on your registration form.'}</p>
      {message && <div className={`login-message ${messageType}`} role="alert">{message}</div>}
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" required value={username} placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
        {mode === 'signup' && (
          <>
            <label>Account Type:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="jobseeker">Jobseeker</option>
              <option value="company">Company</option>
            </select>
            <label>Email Address:</label>
            <input type="email" required value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
          </>
        )}
        <label>Password:</label>
        <input type="password" required minLength="6" value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
        {mode === 'signup' && (
          <>
            <label>Confirm Password:</label>
            <input type="password" required minLength="6" value={confirmPassword} placeholder="Confirm your password" onChange={(e) => setConfirmPassword(e.target.value)} />
          </>
        )}
        <button className="su" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Please wait...' : mode === 'login' ? 'SIGN IN' : 'SIGN UP'}
        </button>
      </form>
      <button className="login-switch" type="button" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setMessage('') }}>
        {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
      </button>
    </div>
  )
}

export default Login
