import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { workFields } from "./workFields";

const Company = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [CompanyName, setCompanyName] = useState('');
  const [Phonenumber, setPhonenumber] = useState('');
  const [EmailAddress, setEmailAddress] = useState('');
  const [Companylocation, setCompanylocation] = useState('');
  const [Companytype, setCompanytype] = useState('');
  const [WorkField, setWorkField] = useState('');
  const [Numberofemployees, setNumberofemployees] = useState('');
  const [Companydiscription, setCompanydiscription] = useState('');

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem('authUser') || 'null');
    if (!authUser) {
      navigate('/login');
      return;
    }
    setEmailAddress(authUser.email || '');
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    const authUser = JSON.parse(localStorage.getItem('authUser') || 'null');
    if (!authUser) {
      navigate('/login');
      return;
    }
    if (EmailAddress.trim().toLowerCase() !== authUser.email.toLowerCase()) {
      setMessage('The email on this form must be the same as the email you used to sign up.');
      setMessageType('error');
      return;
    }
    setIsSubmitting(true);
    const company = { CompanyName, Phonenumber, EmailAddress, Companylocation, Companytype, WorkField, Numberofemployees, Companydiscription };

    fetch(https://ehtionexa.onrender.com, {
      method: 'POST',
      headers: { "Content-Type": "application/json", Authorization: authUser.token },
      body: JSON.stringify(company)
    })
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to save company');
      }
      return data;
    })
    .then(() => {
      setMessage('Your company registration was completed successfully.');
      setMessageType('success');
      setTimeout(() => navigate('/dashboard'), 800);
    })
    .catch((error) => {
      setMessage(`Registration failed: ${error.message}`);
      setMessageType('error');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  }

  return (
    <div className="company">
      <h2>Create Your Company Account</h2>
      <p className="company-intro">Register your company and connect with talented professionals. Use the same email you signed up with.</p>
      {message && (
        <div className={`company-message ${messageType}`} role="alert">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>Company Name</label>
        <input type="text" placeholder="Enter your company name" required value={CompanyName} onChange={(e) => setCompanyName(e.target.value)} />
        <label>Phone Number:</label>
        <input type="tel" placeholder="e.g. +251900000000" inputMode="tel" required value={Phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
        <label>Email Address:</label>
        <input type="email" placeholder="Must match your signup email" required value={EmailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
        <label>Company Location:</label>
        <input type="text" placeholder="Enter Your Company location" required value={Companylocation} onChange={(e) => setCompanylocation(e.target.value)} />
        <label>Company Type:</label>
        <input type="text" placeholder="e.g. Technology,Healthcare,Construction.." required value={Companytype} onChange={(e) => setCompanytype(e.target.value)} />
        <label>Work Field:</label>
        <select required value={WorkField} onChange={(e) => setWorkField(e.target.value)}>
          <option value="">Choose the work field</option>
          {workFields.map((field) => (
            <option key={field} value={field}>{field}</option>
          ))}
        </select>
        <label>Number Of Employees:</label>
        <input type="text" placeholder="e.g. 10-50 employees" required value={Numberofemployees} onChange={(e) => setNumberofemployees(e.target.value)} />
        <label>Company Description</label>
        <textarea required placeholder="Tell us about your company" value={Companydiscription} onChange={(e) => setCompanydiscription(e.target.value)}></textarea>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default Company;
