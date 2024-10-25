import { Link } from "react-router-dom";
import logo1 from "../assets/logosmall.png";
import xmark from "../assets/xmark.svg";
import "../style/dash.css";
import { useState, useEffect } from "react";

function Select() {
  const [isNavActive, setNavActive] = useState(false);

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }
  const logOut = async () => {
    const token = window.localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:3001/saveData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({ balance, profit }),
      });

      const data = await response.json();
      if (data.status === "ok") {
        console.log("Balance and profit saved successfully.");
      } else {
        console.error("Error saving balance and profit:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    window.localStorage.clear();
    navigate("/login");
  }

  const [userData, setUserData] = useState("");
  

  useEffect(() => {
    fetch("http://localhost:3001/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
   
        setUserData(data.data);

        if (data.data == "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
    }, []);

    function closeNavigation() {
      setNavActive(false);
    }
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
                <Link to={"/user"} className="active">
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
                <Link to={"/login"} onClick={logOut}>
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
              <p>Welcome </p>
            </div>
          </div>
          <div className="withdraw">
            <h2>Select Withdrawal Method</h2>
            <div className="method">
              <ul>
                <li>
                  <Link to={"./bank"} className="list">
                    Bank
                  </Link>
                </li>
                <li>
                  <Link to={"./crypto"} className="list">
                    Crypto
                  </Link>
                </li>
                <li>
                  <Link to={"./paypal"} className="list">
                    PayPal
                  </Link>
                </li>
                <li>
                  <Link to={"./cashapp"} className="list">
                    CashApp
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Select;
