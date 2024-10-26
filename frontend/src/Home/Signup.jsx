import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import goog from "../assets/google.svg";
import eye from "../assets/eye.svg"; // Eye icon for showing password
import eyeOff from "../assets/eye-off.svg"; // Eye icon for hiding password
import "../style/home.css";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const countries = [
  { value: "", label: "Select Country" },
  { value: "afghanistan", label: "Afghanistan" },
  { value: "albania", label: "Albania" },
  // Add other countries here...
  { value: "united_states", label: "United States" },
  { value: "zimbabwe", label: "Zimbabwe" },
];

export default function Signup() {
  const [username, setUserName] = useState("");
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic client-side validation
    if (!username || !fname || !lname || !date || !address || !country || !phone || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          fname,
          lname,
          date,
          address,
          country,
          phone,
          email,
          password,
          balance: "--",  // Assuming you need these fields in the signup
          profit: "--",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'An unknown error occurred');
      }

      if (data.success) {
        // Store the token in local storage or state for further requests
        localStorage.setItem("token", data.token);
        toast.success("Registration Successful");
        navigate("/login");
      } else {
        toast.error("Registration failed: " + (data.error || 'Unknown error'));
      }

    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="reg">
        <div className="form">
          <div className="sect">
            <div className="text3">
              <h1>Join Now</h1>
              <p>
                Join the 1 million people who have already chosen GNF
                <br />
                Licensed and regulated across multiple jurisdictions, we serve
                clients in over 150 countries worldwide.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="form1">
              {[ 
                { label: "Username", type: "text", id: "username", value: username, setter: setUserName },
                { label: "First Name", type: "text", id: "fname", value: fname, setter: setFirstName },
                { label: "Last Name", type: "text", id: "lname", value: lname, setter: setLastName },
                { label: "Date of birth", type: "date", id: "date", value: date, setter: setDate },
                { label: "Address", type: "text", id: "address", value: address, setter: setAddress },
                { label: "Phone", type: "tel", id: "phone", value: phone, setter: setPhone },
                { label: "Email", type: "email", id: "email", value: email, setter: setEmail },
              ].map(({ label, type, id, value, setter }) => (
                <div key={id}>
                  <label htmlFor={id}>{label}</label>
                  <input
                    type={type}
                    id={id}
                    value={value}
                    required
                    onChange={(e) => setter(e.target.value)}
                  />
                </div>
              ))}
              <div>
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {countries.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="password-container">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="eye-button" onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}>
                  <img src={showPassword ? eye : eyeOff} alt={showPassword ? "Hide password" : "Show password"} />
                  </div>
                </div>
              </div>
              <button type="submit" id="signup">
                Register
              </button>
            </form>
            <div className="signup">
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
            <div className="divider">
              <span className="or">or</span>
            </div>
            <div className="google-sect">
              <Link href="#">
                <span>
                  <img src={goog} alt="google icon" />
                </span>
                Continue with Google
              </Link>
              <br />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}
