import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('authUser') || 'null')
  const token = user?.token

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    fetch("https://ehtionexa.onrender.com/dashboard", { headers: { Authorization: token } })
      .then(async (response) => {
        const result = await response.json()
        if (!response.ok) throw new Error(result.message || 'Unable to load dashboard.')
        return result
      })
      .then(setData)
      .catch((requestError) => setError(requestError.message))
  }, [navigate, token])

  if (!user) return null

  return (
    <main className="dashboard">
      <section className="dashboard-header">
        <div>
          <p className="dashboard-kicker">{user.role === 'jobseeker' ? 'Jobseeker account' : 'Company account'}</p>
          <h2>Welcome, {user.username}</h2>
          <p>{user.email}</p>
        </div>
        <button type="button" onClick={() => { localStorage.removeItem('authUser'); navigate('/login') }}>Log out</button>
      </section>
      {error && <div className="login-message error">{error}</div>}
      {data && !data.profile && (
        <section className="dashboard-empty">
          <h3>Complete your registration</h3>
          <p>Use the same email you signed up with, then matching opportunities will appear here.</p>
          <Link to={user.role === 'jobseeker' ? '/jobseeker' : '/company'} className="dashboard-action">Register as {user.role}</Link>
        </section>
      )}
      {data?.profile && (
        <>
          <section className="profile-panel">
            <h3>Your information</h3>
            <p><strong>{user.role === 'jobseeker' ? `${data.profile.FirstName} ${data.profile.LastName}` : data.profile.CompanyName}</strong></p>
            <p>{user.role === 'jobseeker' ? `Work field: ${data.profile.Field}` : `Work field: ${data.profile.WorkField}`}</p>
            <p>Phone: {data.profile.Phonenumber}</p>
            <p>Email: {data.profile.EmailAddress}</p>
          </section>
          <section className="matches-panel">
            <h3>{user.role === 'jobseeker' ? 'Companies hiring in your field' : 'Jobseekers in your work field'}</h3>
            {data.matches.length === 0 ? <p>No matching registrations yet.</p> : data.matches.map((match) => (
              <article className="match-item" key={match._id}>
                <strong>{user.role === 'jobseeker' ? match.CompanyName : `${match.FirstName} ${match.LastName}`}</strong>
                <span>{user.role === 'jobseeker' ? `${match.Companytype} · ${match.Companylocation}` : `${match.Field} · ${match.City}`}</span>
                <span>Phone: {match.Phonenumber}</span>
                <span>Email: {match.EmailAddress}</span>
              </article>
            ))}
          </section>
        </>
      )}
    </main>
  )
}

export default Dashboard
