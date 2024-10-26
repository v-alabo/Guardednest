import { Link, useNavigate, useParams  } from "react-router-dom";
import logo1 from "../assets/logosmall.png";
import xmark from "../assets/xmark.svg";
import "../style/dash.css";
import { useState, useEffect } from "react";

export default function Payment() {
  const [isNavActive, setNavActive] = useState(false);
  const [userData, setUserData] = useState(null);
  const [fundData, setFundData] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [cryptoRates, setCryptoRates] = useState({});
  const navigate = useNavigate();
  const { username } = useParams();

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

// Fetch user data by username
useEffect(() => {
  const fetchUserData = async () => {
    if (!username) return;

    try {
      const response = await fetch(`http://localhost:3001/users/${username}`, {
        method: 'GET',
        credentials: 'include', // Include cookies
      });

      const data = await response.json();
      if (data.status === 'ok') {
        setUserData(data.data); // Set the user data with the fetched user info
      } else {
        console.error("Error fetching user data:", data.error);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  fetchUserData();
}, [username]);


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
          "Access-Control-Allow-Origin": "*",
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

  const divisionResult =
    fundData && fundData.amount && selectedCrypto && cryptoRates[selectedCrypto]?.usd
      ? parseFloat(fundData.amount) / parseFloat(cryptoRates[selectedCrypto].usd)
      : null;

  const cryptoShortForms = {
    bitcoin: "BTC",
    ethereum: "ETH",
    tether: "USDT",
  };

  const invoice = divisionResult !== null ? `${divisionResult.toFixed(4)} ${cryptoShortForms[selectedCrypto]}` : null;

  useEffect(() => {
    // Retrieve token from local storage
    const token = window.localStorage.getItem("token");
  
    if (!token) {
      navigate("/login"); // Redirect to login page if token is not available
      return;
    }

    // Fetch fund data
    fetch("http://localhost:3001/fundData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ token }), // Send token in the request body
    })
      .then((res) => res.json())
      .then((data) => {
        
        if (data.status === 'ok') {
          
          setFundData(data.data);
        } else {
          console.error("Error fetching fund data:", data.error);
        }
      });

    // Fetch crypto rates
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd"
    )
      .then((res) => res.json())
      .then((data) => {
        setCryptoRates(data);
      });
  }, [navigate]);

  const handleProceed = async () => {

    if (!selectedCrypto) {
      alert("Please select a cryptocurrency.");
      return;
    }

    const token = window.localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await fetch("http://localhost:3001/transactions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username,
          type: "Deposit",
          amount: fundData.amount,
          status: "pending",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit transaction");
      }

      const data = await response.json();

      if (data.status === "ok") {
        alert("Transaction Successful");
        // Optionally redirect the user or perform other actions
      } else {
        console.log("Error submitting transaction:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    navigate(`/user/${username}/fund/payment/confirmation`, {
      state: { amount: fundData.amount, crypto: selectedCrypto, invoice },
    });
  };

  function closeNavigation() {
    setNavActive(false);
  }

  return (
    <>
      <div className="container">
      <div className={`navigation ${isNavActive ? "active" : ""}`}>
          <div className="navbar">
            <img className="logo1" src={logo1} alt="logo" />
            <img
              className="xmark"
              src={xmark}
              alt="logo"
              onClick={closeNavigation}
            />
          </div>

          <ul>
            <li>
              <Link to={`/user/${username}`}>
                <span className="icon">
                  <ion-icon name="home-outline"></ion-icon>
                </span>
                <span className="title">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={`/user/${username}/withdrawals`}>
                <span className="icon">
                  <ion-icon name="wallet-outline"></ion-icon>
                </span>
                <span className="title">Withdrawals</span>
              </Link>
            </li>
            <li>
              <Link to={`/user/${username}/transactions`}>
                <span className="icon">
                  <ion-icon name="stats-chart-outline"></ion-icon>
                </span>
                <span className="title">Transactions</span>
              </Link>
            </li>
            <li>
              <Link to={`/user/${username}/settings`}>
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
              <p>Welcome  {userData ? userData.fname : "User"}</p>
            </div>
          </div>
          <div className="tab">
            <div className="bank">
              <div className="text5">
                <h2>Pay ${fundData?.amount}</h2>
                <p>Make Payment</p>
                <p>{invoice}</p>
              </div>

              <form>
                <label htmlFor="crypt">Select Crypto</label>
                <br />
                <select
                  name="crypt"
                  id="crypt"
                  value={selectedCrypto}
                  onChange={(e) => setSelectedCrypto(e.target.value)}
                >
                  <option value="">Select Crypto</option>
                  <option value="bitcoin">Bitcoin BTC</option>
                  <option value="ethereum">Ethereum ETH</option>
                  <option value="tether">Tether USDT</option>
                </select>
                <button
                  type="button"
                  className="go"
                  onClick={handleProceed}
                >
                  Proceed
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
