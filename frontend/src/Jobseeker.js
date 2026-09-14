import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { workFields } from "./workFields";

const Jobseeker = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Gender, setGender] = useState('');
  const [Phonenumber, setPhonenumber] = useState('');
  const [EmailAddress, setEmailAddress] = useState('');
  const [DateofBirth, setDateofBirth] = useState('');
  const [City, setCity] = useState('');
  const [Field, setField] = useState('');
  const [WorkExperience, setWorkExperience] = useState('');
  const [UniversityCollege, setUniversityCollege] = useState('');
  const [GraduationYear, setGraduationYear] = useState('');
  const [CV, setCV] = useState('');

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
    const Jobseeker = { FirstName, LastName, Gender, Phonenumber, EmailAddress, DateofBirth, City, Field, WorkExperience, UniversityCollege, GraduationYear, CV };

    fetch("https://ehtionexa.onrender.com/Jobseekers", {
      method: 'POST',
      headers: { "Content-Type": "application/json", Authorization: authUser.token },
      body: JSON.stringify(Jobseeker)
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.message || "Failed to save Jobseeker");
        });
      }
      return response.json();
    })
    .then(() => {
      setMessage("Your registration was completed successfully.");
      setMessageType("success");
      setTimeout(() => navigate('/dashboard'), 800);
    })
    .catch((error) => {
      setMessage(`Registration failed: ${error.message}`);
      setMessageType("error");
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  }

  return (
    <div className="seeker">
      <h2>Create Your Jobseeker Account</h2>
      <p className="seeker-intro">Share your details and connect with your next opportunity. Use the same email you signed up with.</p>
      {message && (
        <div className={`seeker-message ${messageType}`} role="alert">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input type="text" placeholder="Enter First Name" required value={FirstName} onChange={(e) => setFirstName(e.target.value)} />
        <label>Last Name:</label>
        <input type="text" placeholder="Enter Last Name" required value={LastName} onChange={(e) => setLastName(e.target.value)} />
        <label>Gender:</label>
        <select required value={Gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Choose gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
        <label>Phone Number:</label>
        <input type="tel" inputMode="tel" placeholder="e.g. +251900000000" required value={Phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
        <label>Email Address:</label>
        <input type="email" placeholder="Must match your signup email" required value={EmailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
        <label>Date of Birth:</label>
        <input type="date" required value={DateofBirth} onChange={(e) => setDateofBirth(e.target.value)} />
        <label>City:</label>
        <select required value={City} onChange={(e) => setCity(e.target.value)}>
          <option value="">Choose city</option>
          <option value="Addiss Ababa">Addiss Ababa</option>
          <option value="Dire Dewa">Dire Dewa</option>
          <option value="Harar">Harar</option>
          <option value="Debrebirhan">Debrebirhan</option>
          <option value="Adigrat">Adigrat</option>
          <option value="Mekele">Mekele</option>
          <option value="Nazret">Nazret</option>
        </select>
        <label>Work Field:</label>
        <select required value={Field} onChange={(e) => setField(e.target.value)}>
          <option value="">Choose the work field</option>
          {workFields.map((field) => (
            <option key={field} value={field}>{field}</option>
          ))}
        </select>
        <label>Work Experience:</label>
        <input type="text" required value={WorkExperience} onChange={(e) => setWorkExperience(e.target.value)} />
        <label>University/College:</label>
        <input type="text" required value={UniversityCollege} onChange={(e) => setUniversityCollege(e.target.value)} />
        <label>Graduation Year:</label>
        <input type="number" min="1900" max={new Date().getFullYear()} required value={GraduationYear} onChange={(e) => setGraduationYear(e.target.value)} />
        <label>CV</label>
        <textarea required placeholder="Enter your CV letter" value={CV} onChange={(e) => setCV(e.target.value)}></textarea>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Jobseeker;
