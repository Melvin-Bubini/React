import "../css/RegisterPage.css"
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const RegisterPage = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const { register } = useAuth();

  const validateForm = () => {
    let isValid = true;

    if (name.trim().length < 3) {
      setNameError("Namnet måste vara minst 3 tecken.");
      isValid = false;
    } else {
      setNameError("");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
      setEmailError("Ange en giltig e-postadress.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("Lösenordet måste vara minst 6 tecken.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      await register({ name, email, password });

      navigate('/profile');

      // återställer formuläret
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ett okänt fel uppstod vid registrering.");
      }
    }
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Registera dig</h2>

        <form onSubmit={handleSubmit}>
          {error && (<div className="error-message">
            {error}
          </div>)}

          <div className="form-group">
            <input autoComplete="off" className="input" type="name" id="name" required value={name} onChange={(e) => setName(e.target.value)} />
            <label className="user-label" htmlFor="name">Namn</label>
            {nameError && <p className="error-text">{nameError}</p>}
          </div>

          <div className="form-group">
            <input autoComplete="off" className="input" type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <label className="user-label" htmlFor="email">E-postadress</label>
            {emailError && <p className="error-text">{emailError}</p>}
          </div>

          <div className="form-group">
            <input autoComplete="off" className="input" type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <label className="user-label" htmlFor="password">Lösenord</label>
            {passwordError && <p className="error-text">{passwordError}</p>}
          </div>

          <button type="submit" className="submitBtn"><strong>Registera dig</strong></button>

          <p>Har du redan ett konto? <NavLink to="/login">Logga in</NavLink></p>

        </form>
      </div>
    </div>
  );
};

export default RegisterPage