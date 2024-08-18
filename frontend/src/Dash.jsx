import { Link } from "react-router-dom";
import logo1 from "./assets/logosmall.png";
import cus1 from "./assets/customer01.jpg";
import xmark from "./assets/xmark.svg";
import "./style/dash.css";
import { useState, useEffect } from "react";
export default function Dash() {
  const [isNavActive, setNavActive] = useState(false);

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  function closeNavigation() {
    setNavActive(false);
  }

  const logOut = () => {
    window.localStorage.clear();
  };

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
          window.location.href = "/login";
        }
      });
  }, []);


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
              <Link to={"/user"}>
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
              <p>Welcome {userData.fname}</p>
              <div className="user">
                <img src={cus1} alt="profie-photo" />
              </div>
            </div>
          </div>

          <div className="user-content">
            <div className="cardBox">
              <div className="head">
                <div className="card">
                  <div className="tab-1">
                    <div className="cardName">Balance:</div>
                    <div className="numbers">$0.00</div>
                    <div className="bar-1">
                      <button>
                      <Link className="link" to={"./fund"}>
                        Fund
                      </Link>
                      </button>
                     
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="tab-2">
                    <div className="cardName">Profit:</div>
                    <div className="numbers">$0.00</div>
                    <div className="bar-2">
                      <button>
                      <Link className="link" to={"./user/transfer"}>
                      Transfer
                      </Link>
                      </button>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="details"><div className="cardHeader">
                  <h2>Transanctions</h2>
                </div>
              <div className="recentTransact">
                

                <table>
                  <thead>
                    <tr>
                      <td>Transaction</td>
                      <td>Amount</td>
                      <td>Status</td>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Deposit</td>
                      <td>$5500</td>
                      <td>
                        <span className="status delivered">Delivered</span>
                      </td>
                    </tr>

                    <tr>
                      <td>Profit</td>
                      <td>$110</td>
                      <td>
                        <span className="status inProgress">In Progress</span>
                      </td>
                    </tr>

                    <tr>
                      <td>Withdrawal</td>
                      <td>$1200</td>
                      <td>
                        <span className="status return">Failed</span>
                      </td>
                    </tr>

                    <tr>
                      <td>Dell Laptop</td>
                      <td>$110</td>
                      <td>
                        <span className="status pending">Pending</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
