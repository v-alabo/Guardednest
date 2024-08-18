import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.png";
import bar from "./assets/bar.svg";
import xmark from "./assets/xmark.svg";
import goog from "./assets/google.svg";
import "./style/home.css";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log(username, password);
    fetch("http://localhost:3001/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);

          window.location.href = "./user";
        }
      });
  }

  const [isNavActive, setNavActive] = useState(false);

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  return (
    <>
      <nav>
        <div className="top">
          <a className="logo" href="home.html">
            <img src={logo} alt="logo" />
          </a>
          <div className="bar" onClick={toggleNavigation}>
            <img src={isNavActive ? xmark : bar} alt="menu" />
          </div>
        </div>
        <ul className={`menu ${isNavActive ? "active" : ""}`}>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <Link to={"/login"} className="book">
            Sign-in
          </Link>
        </ul>
      </nav>
      <div className="content">
        <div className="section">
          <div className="login">
            <div className="text2">
              <h2>Welcome back!</h2>
              <p>
                Hey there! Ready to log in? Just enter your username and
                password below and you&#39;ll be back in action in no time.
                Let&#39;s go!
              </p>
            </div>

            <div className="google-sect">
              <a href="#">
                <span>
                  <img src={goog} alt="google icon" />
                </span>
                Continue with google{" "}
              </a>
              <br />
            </div>
            <div className="divider">
              <span className="or">or</span>
            </div>

            <form onSubmit={handleSubmit} className="sign">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                required
                onChange={(e) => setUserName(e.target.value)}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <a className="forgot" href="forgot-pass.html">
                Forgot Password?
              </a>
              <button type="submit" id="submit">
                Sign in
              </button>
            </form>

            <div className="signup">
              <p>
                {" "}
                Don&#39;t have an account? <Link to="/register">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="foot">
          <div className="col0">
            <img src={logo} alt="logo" />
            <h3>
              Welcome to our investment site! We offer the best,
              <br />
              most affordable products and services around.
              <br />
              Shop now and start finding great deals!
            </h3>
          </div>

          <div className="col1">
            <ul>
              <p>Quick link</p>
              <li>
                <Link to={"/home"}>Home</Link>
              </li>
              <li>
                <Link to={"/about"}>About</Link>
              </li>
              <li>
                <Link to={"/services"}>Services</Link>
              </li>
              <li>
                <Link to={"/contact"}>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="col2">
            <ul>
              <p>Account</p>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
              <li>
                <Link to={"/register"}>Sign up</Link>
              </li>
              <li>
                <Link to={"/human-rights"}>Human Rights Policy</Link>
              </li>
              <li>
                <Link to={"/support"}>Support Center</Link>
              </li>
            </ul>
          </div>
          <div className="col3">
            <ul>
              <p>Support</p>
              <li>
                <Link to={"/policy"}>Privacy Policy</Link>
              </li>
              <li>
                <Link to={"/terms"}>Terms&Conditions</Link>
              </li>
              <li>
                <Link to={"/faq"}>FAQs</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="copyright">
          <h3>© 2023 All Rights Reserved By GNF</h3>
        </div>
      </footer>
    </>
  );
}
