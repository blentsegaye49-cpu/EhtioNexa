import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('authUser') || 'null')

  const logout = () => {
    localStorage.removeItem('authUser')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <img src="Ethiionexa.png" alt="" className="brand-mark" />
        <h1>EthioNexa</h1>
      </Link>
      <div className="links">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button className="but" type="button" onClick={logout}>Log out</button>
          </>
        ) : (
          <Link className="but" to="/login">Login</Link>
        )}
      </div>
    </nav>
  )
}
