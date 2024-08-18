import { Link, useNavigate } from "react-router-dom";
import logo1 from "./assets/logosmall.png";
import cus1 from "./assets/customer01.jpg";
import xmark from "./assets/xmark.svg";
import "./style/dash.css";
import { useState, useEffect } from "react";

export default function Payment() {
  const [isNavActive, setNavActive] = useState(false);
  const [userData, setUserData] = useState("");
  const [fundData, setFundData] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [cryptoRates, setCryptoRates] = useState({});
  const navigate = useNavigate();

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  const logOut = () => {
    window.localStorage.clear();
  };


  const divisionResult =
  fundData && fundData.amount && selectedCrypto && cryptoRates[selectedCrypto]?.usd
  ? parseFloat(fundData.amount) / parseFloat(cryptoRates[selectedCrypto].usd)
  : null;

  const cryptoShortForms = {
    bitcoin: "btc",
    ethereum: "eth",
    tether: "usdt",
  };

  const invoice = divisionResult !== null ? `${divisionResult.toFixed(4)} ${cryptoShortForms[selectedCrypto]}` : null

  useEffect(() => {
    // Retrieve token from local storage
    const token = window.localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login page if token is not available
      return;
    }

    fetch("http://localhost:3001/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setUserData(data.data);
      });

   // Fetch fund data
   fetch("http://localhost:3001/fundData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }), // Send token in the request body
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "fundData");
      if (data.status === "ok") {
        setFundData(data.data);
      } else {
        // Handle error, such as invalid token
        console.error("Error fetching fund data:", data.error);
      }
    });

    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCryptoRates(data);
      });
  }, [navigate]);

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
              <Link to={"/user"} activeClassName="active">
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
          <div className="tab">
            <div className="bank">
              <div className="text5">
                <h2>Pay ${fundData.amount}</h2>
                <p>Make Payment</p>
                <p>{invoice}</p>
              </div>

              <form action="">
                <label htmlFor="crypt">Select Crypto</label>
                <br />
                <select
                  name="crypt"
                  id="crypt"
                  value={selectedCrypto}
                  onChange={(e) => setSelectedCrypto(e.target.value)}
                >
                  <option>Select Crypto</option>
                  <option value="bitcoin">Bitcoin BTC</option>
                  <option value="ethereum">Ethereum ETH</option>
                  <option value="tether">Tether USDT</option>
                </select>
                <button className="go">Proceed</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}