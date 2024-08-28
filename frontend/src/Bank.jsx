import { Link, useNavigate } from "react-router-dom";
import logo1 from "./assets/logosmall.png";
import cus1 from "./assets/customer01.jpg";
import xmark from "./assets/xmark.svg";
import "./style/dash.css";
import { useState, useEffect } from "react";

export default function Bank() {
  const [isNavActive, setNavActive] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  // Form state
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState("");
  const [acctnum, setAcctNum] = useState("");
  const [acctname, setAcctName] = useState("");

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  function closeNavigation() {
    setNavActive(false);
  }

  const logOut = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  const handleProceed = async () => {
    const token = window.localStorage.getItem("token");

    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/withdraw-bank", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ acctname, acctnum, bank, amount, token }),
      });

      const data = await response.json();

      if (data.status === "ok") {
        console.log(data, "withdrawalMade");
        alert("Withdrawal Made Successfully");

        try {
          const transactionResponse = await fetch("http://localhost:3001/transactions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              type: "Withdrawal",
              amount: amount,
              status: "progress",
            }),
          });

          const transactionData = await transactionResponse.json();

          if (transactionData.status === "ok") {
            alert("Transaction Successful");
            navigate("/user");
          } else {
            console.log("Error submitting transaction:", transactionData.error);
            alert("Error submitting transaction. Please try again.");
          }
        } catch (error) {
          console.error("Error submitting transaction:", error);
        }

      } else {
        console.log("Error making withdrawal:", data.error);
        alert("Error making withdrawal. Please try again.");
      }
    } catch (error) {
      console.error("Error making withdrawal:", error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:3001/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");

        if (data.status === "ok") {
          setUserData(data.data);
        } else if (data.data === "token expired") {
          alert("Token expired. Please log in again.");
          window.localStorage.clear();
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        alert("Error fetching user data. Please try again.");
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className={`navigation ${isNavActive ? "active" : ""}`}>
          <div className="navbar">
            <img className="logo1" src={logo1} alt="logo" />
            <img className="xmark" src={xmark} alt="close" onClick={closeNavigation} />
          </div>

          <ul>
            <li>
              <Link to={"/user"}>
                <span className="icon">
                  <ion-icon name="home-outline"></ion-icon>
                </span>
                <span className="title">Dashboard</span>
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
                <img src={cus1} alt="profile-photo" />
              </div>
            </div>
          </div>
          <div className="tab">
            <div className="bank">
              <div className="text5">
                <h2>Withdraw to Bank</h2>
                <p>We may contact you for more information</p>
              </div>

              <form>
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <label htmlFor="bank">Bank</label>
                <input
                  type="text"
                  id="bank"
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                />
                <label htmlFor="acctnum">Account Number</label>
                <input
                  type="number"
                  id="acctnum"
                  value={acctnum}
                  onChange={(e) => setAcctNum(e.target.value)}
                />
                <label htmlFor="acctname">Account Name</label>
                <input
                  type="text"
                  id="acctname"
                  value={acctname}
                  onChange={(e) => setAcctName(e.target.value)}
                />
                <button type="button" className="go" onClick={handleProceed}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
