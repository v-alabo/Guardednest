import { Link } from "react-router-dom";
import logo from "../assets/logosmall.png";
import logo2 from "../assets/logo2.png"
import serv1 from "../assets/services/1.png";
import serv2 from "../assets/services/2.png";
import serv3 from "../assets/services/3.png";
import serv4 from "../assets/services/4.png";
import serv5 from "../assets/services/5.png";
import serv6 from "../assets/services/6.png";
import bar from "../assets/bar.svg";
import xmark from "../assets/xmark.svg";
import { useState } from "react";
import "../style/home.css";

function Services() {
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

      <div className="container">
        <div className="text4">
          <h1>
            <span>Services</span> We Offer
          </h1>
          <p>
            We provide premier services, spanning market values, maintenance,
            and additional offerings, presenting a compelling investment
            opportunity in the realm of superior service provision.
          </p>
        </div>
        <div className="service">
          <div className="service-info">
            <div className="service-thumb">
              <img src={serv1} alt="service-icon" />
            </div>

            <div className="service-content">
              <h3>Strategy Consulting</h3>
              <p>
                A social assistant that&#39;s flexible can accommodate your
                schedule and needs, making life easier.
              </p>
            </div>
          </div>

          <div className="service-info">
            <div className="service-thumb">
              <img src={serv2} alt="service-icon" />
            </div>

            <div className="service-content">
              <h3>Financial Advisory</h3>
              <p>
                Modules transform smart trading by automating processes and
                improving decision-making.
              </p>
            </div>
          </div>

          <div className="service-info">
            <div className="service-thumb">
              <img src={serv3} alt="service-icon" />
            </div>

            <div className="service-content">
              <h3>Management</h3>
              <p>
                There, it&#39;s me, your friendly neighborhood reporter&#39;s
                news analyst processes and improving
              </p>
            </div>
          </div>

          <div className="service-info">
            <div className="service-thumb">
              <img src={serv4} alt="service-icon" />
            </div>

            <div className="service-content">
              <h3>Supply Optimization</h3>
              <p>
                Hey, have you checked out that new cryptocurrency platform?
                It&#39;s pretty cool and easy to use!
              </p>
            </div>
          </div>

          <div className="service-info">
            <div className="service-thumb">
              <img src={serv5} alt="service-icon" />
            </div>

            <div className="service-content">
              <h3>HR consulting</h3>
              <p>
                Hey guys, just a quick update on exchange orders. There have
                been some changes currency!
              </p>
            </div>
          </div>

          <div className="service-info">
            <div className="service-thumb">
              <img src={serv6} alt="service-icon" />
            </div>

            <div className="service-content">
              <h3>Marketing consulting</h3>
              <p>
                Hey! Just wanted to let you know that the price notification
                module processes is now live!
              </p>
            </div>
          </div>
        </div>
        <div className="prices">
          <div className="price-info">
            <div className="amount">
              <h5>Starter</h5>
              <h1>$100</h1>
            </div>
            <p>
              Min Deposit $100
              <br />
              Referral Bonus
              <br />
              Full IT Support
            </p>
            <Link className="plan" to="/login">
              Purchase Plan
            </Link>
          </div>

          <div className="price-info">
          <div className="amount">
              <h5>Regular</h5>
              <h1>$500</h1>
            </div>
            <p>
              Min Deposit $500
              <br />
              Referral Bonus
              <br />
              Full IT Support
            </p>
            <Link className="plan" to="/login">
              Purchase Plan
            </Link>
          </div>

          <div className="price-info">
          <div className="amount">
              <h5>Premium</h5>
              <h1>$2500</h1>
            </div>
            <p>
              Min Deposit $2500
              <br />
              Referral Bonus
              <br />
              Full IT Support
            </p>
            <Link className="plan" to="/login">
              Purchase Plan
            </Link>
          </div>

          <div className="price-info">
          <div className="amount">
              <h5>Classic</h5>
              <h1>$5500</h1>
            </div>
            <p>
              Min Deposit $5500
              <br />
              Referral Bonus
              <br />
              Full IT Support
            </p>
            <Link className="plan" to="/login">
              Purchase Plan
            </Link>
          </div>
        </div>
      </div>

      <footer>
        <div className="foot">
          <div className="col0">
            <img src={logo2} alt="logo" />
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

export default Services;
