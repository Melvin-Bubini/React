import { useState } from "react"
import '../css/LoginPage.css';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

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
          </div>

          <div className="form-group">
            <input autoComplete="off" className="input" type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <label className="user-label" htmlFor="password">Lösenord</label>
          </div>

          <button type="submit" className="submitBtn"><strong>Logga in</strong></button>


        </form>
      </div>
    </div>
  )
}

export default LoginPage