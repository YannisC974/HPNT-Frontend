import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import ReCAPTCHA from "react-google-recaptcha";
import { Input } from "./Input";

axios.defaults.withCredentials = true;

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);
  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!recaptchaToken) {
      setErrors({ captcha: ["You must pass the captcha"] });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(route, { username, password });
      if (method === "login" && res != null) {
        localStorage.setItem('ticketId', username);
        navigate('/my-ticket');
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        alert("Une erreur est survenue");
      }
    } finally {
      setLoading(false);
      setRecaptchaToken(null);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    }
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  return (
    <div className="flex w-full">
      <div className="flex w-full flex-col items-start">
        <form onSubmit={handleSubmit}>
          <Input
            shape="square"
            className="w-[34%]"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ticket Number"
          />
          {errors.username && (
            <div className="error-message">
              {errors.username.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          <Input
            className="font-notosans text-[1.146vw]"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Security Code"
          />
          {errors.password && (
            <div className="error-message">
              {errors.password.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          {/* <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6Ld7lA0qAAAAAEqstTfR3IHLvn4G6wLkyqtdQ6Rk"
            onChange={handleRecaptchaChange}
          />
          
          {errors.captcha && (
            <div className="error-message">
              {errors.captcha.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          {loading && <LoadingIndicator />}
          <button className="form-button" type="submit">
            {name}
          </button> */}
        </form>
      </div>
    </div>
  );
  
}

export default Form