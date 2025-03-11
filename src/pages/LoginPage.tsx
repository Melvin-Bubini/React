import { useState, useEffect } from "react"
import '../css/LoginPage.css';
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [ emailError, setEmailError ] = useState('');
  const [passwordError, setPasswordError] = useState("");

  const { login, user } = useAuth();
  const navigate = useNavigate();

  //kontrollera användare
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  const validateForm = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("E-postadress är obligatorisk.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Ogiltig e-postadress.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Lösenord är obligatoriskt.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Lösenordet måste vara minst 6 tecken.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) return;
    try {
      await login({email, password});

      navigate("/profile");

      setEmail('');
      setPassword('');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ett okänt fel uppstod vid inloggning.");
      }
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Logga in</h2>

        <form onSubmit={handleSubmit}>
          {error && (<div className="error-message">
            {error}
          </div>)}


          <div className="form-group">
            <input autoComplete="off" className="input" type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <label className="user-label" htmlFor="email">E-postadress</label>
            {emailError && <div className="error-message">{emailError}</div>}
          </div>

          <div className="form-group">
            <input autoComplete="off" className="input" type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <label className="user-label" htmlFor="password">Lösenord</label>
            {passwordError && <div className="error-message">{passwordError}</div>}
          </div>

          <button type="submit" className="submitBtn"><strong>Logga in</strong></button>

          <p>Har du inget konto? <NavLink to="/register">Skapa ett nytt konto</NavLink></p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage