import { Link, useNavigate } from "react-router-dom";
import logo1 from "./assets/logosmall.png";
import xmark from "./assets/xmark.svg";
import cus1 from "./assets/customer01.jpg";
import "./style/dash.css";
import { useState, useEffect } from "react";

function Fund() {
  const [isNavActive, setNavActive] = useState(false);
  const [plan, setPlan] = useState("");
  const [amount, setAmount] = useState("");
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    const token = window.localStorage.getItem("token");
    
    fetch("http://localhost:3001/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setUserData(data.data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  };

  const toggleNavigation = () => {
    setNavActive(!isNavActive);
  };

  function closeNavigation() {
    setNavActive(false);
  }

  const logOut = () => {
    window.localStorage.clear();
  };

  const handlePlanChange = (e) => {
    const selectedPlan = e.target.value;
    let selectedAmount = "";
    switch (selectedPlan) {
      case "Starter":
        selectedAmount = "100";
        break;
      case "Regular":
        selectedAmount = "500";
        break;
      case "Premium":
        selectedAmount = "2500";
        break;
      case "Classic":
        selectedAmount = "5500";
        break;
      default:
        selectedAmount = "";
        break;
    }
    setAmount(selectedAmount);
    setPlan(selectedPlan);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(plan, amount);
    const token = window.localStorage.getItem("token");
    fetch("http://localhost:3001/user/fund", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ plan, amount, token }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "fundCollected");
        alert("Funded Successfully");
        navigate("/user/fund/payment");
      })
      .catch((error) => console.error("Error adding funds:", error));
  };

  return (
    <>
      <div className="container">
        <div className={`navigation ${isNavActive ? "active" : ""}`}>
        <div className="navbar">
          <img className="logo1" src={logo1} alt="logo" />
          <img className="xmark" src={xmark} alt="logo" onClick={closeNavigation} />
          </div>
          <ul>
            <li>
              <Link to={"/user"} >
                <span className="icon">
                  <ion-icon name="home-outline"></ion-icon>
                </span>
                <span className="title ">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={"/user/withdrawals"}>
                <span className="icon">
                  <ion-icon name="wallet-outline"></ion-icon>
                </span>
                <span className="title">Withdrawals</span>
              </Link>
            </li>
            <li>
              <Link to={"/user/transactions"}>
                <span className="icon">
                  <ion-icon name="stats-chart-outline"></ion-icon>
                </span>
                <span className="title">Transactions</span>
              </Link>
            </li>
            <li>
              <Link to={"/user/settings"}>
                <span className="icon">
                  <ion-icon name="settings-outline"></ion-icon>
                </span>
                <span className="title">Settings</span>
              </Link>
            </li>
            <li>
              <Link to={"/login"} onClick={logOut} >
                <span className="icon">
                  <ion-icon name="log-out-outline"></ion-icon>
                </span>
                <span className="title">Sign Out</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className={`main ${isNavActive ? "active" : ""}`}>
          <div className="topbar">
            <div className="toggle" onClick={toggleNavigation}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
              </svg>
            </div>
            <div className="user1">
              <p>Welcome {userData.fname}</p>
              <div className="user">
                <img src={cus1} alt="profie-photo" />
              </div>
            </div>
          </div>
          <div className="tab">
            <div className="bank">
              <div className="text5">
                <h2>Fund Account</h2>
              </div>

              <form onSubmit={handleSubmit}>
                <label htmlFor="plan">Plan</label>
                <br />
                <select id="plan" value={plan} onChange={handlePlanChange}>
                  <option value="Select Plan">Select Plan</option>
                  <option value="Starter">Starter</option>
                  <option value="Regular">Regular</option>
                  <option value="Premium">Premium</option>
                  <option value="Classic">Classic</option>
                </select>
                <label htmlFor="amount">Amount</label>

                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
                <button className="go">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Fund;
