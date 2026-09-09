import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <h3>EthioNexa</h3>
          <p>Connecting Ethiopia to the future by matching talent with opportunity.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/login">Login / Sign up</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Addis Ababa, Ethiopia</p>
          <p>support@ethionexa.com</p>
          <p>+251 900 000 000</p>
        </div>
      </div>
      <p className="footer-copy">&copy; {new Date().getFullYear()} EthioNexa. All rights reserved.</p>
    </footer>
  )
}
