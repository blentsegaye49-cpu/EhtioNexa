import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home-page">
      <section className="in">
        <div className="hero-content">
          <img className="log" src="Ethiionexa.png" alt="EthioNexa logo" />
          <p className="hero-kicker">Connecting Ethiopia to the future</p>
          <h1 className="ti">Welcome to EthioNexa</h1>
          <p className="hero-lead">
            Build your future with us. Explore exciting job opportunities, share your skills,
            and connect with employers looking for talented people like you.
          </p>
          <div className="hero-actions">
            <Link className="but1" to="/login?role=jobseeker">Jobseeker</Link>
            <Link className="but1 but1-alt" to="/login?role=company">Company</Link>
          </div>
        </div>
      </section>

      <section className="promo-banner">
        <div>
          <h2>Limited promotion</h2>
          <p>Create your free account this season and get matched faster with companies and talent in your work field.</p>
        </div>
        <Link className="but1" to="/login">Start for free</Link>
      </section>

      <section className="nuh">
        <h1 className="h1">Who we are</h1>
        <p className="section-intro">EthioNexa connects people with opportunities and helps turn career goals into real possibilities.</p>
        <div className="card-group">
          <article className="card">
            <img src="car1.png" className="card-img-top" alt="Discover opportunities" />
            <div className="card-body">
              <h2 className="card-title">Discover Opportunities</h2>
              <h5 className="card-text">Find the right career for you</h5>
              <p className="card-text">Access roles across technology, healthcare, education, engineering, business, design, and more that match your skills and goals.</p>
            </div>
          </article>
          <article className="card">
            <img src="car2.png" className="card-img-top" alt="Connect with employers" />
            <div className="card-body">
              <h2 className="card-title">Connect With Employers</h2>
              <h5 className="card-text">Bring talent and companies together</h5>
              <p className="card-text">Jobseekers present their experience while companies find candidates who match their work field and requirements.</p>
            </div>
          </article>
          <article className="card">
            <img src="car3.png" className="card-img-top" alt="Build your future" />
            <div className="card-body">
              <h2 className="card-title">Build Your Future</h2>
              <h5 className="card-text">Turn opportunities into growth</h5>
              <p className="card-text">Finding a job is only the beginning. Grow professionally through connections that help you gain experience and new skills.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="join-row">
        <div className="to">
          <h2>Jobseeker</h2>
          <p>Discover job opportunities, showcase your skills, and connect with companies looking for talented people.</p>
          <Link className="but1" to="/login?role=jobseeker">Join as a Jobseeker</Link>
        </div>
        <div className="too">
          <h2>Company</h2>
          <p>Register your company, share openings, and find qualified candidates who match your work field.</p>
          <Link className="but1" to="/login?role=company">Register Your Company</Link>
        </div>
      </section>
    </div>
  )
}
