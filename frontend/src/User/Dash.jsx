import { Link, useNavigate } from "react-router-dom";
import logo1 from "../assets/logosmall.png";
import xmark from "../assets/xmark.svg";
import "../style/dash.css";
import { useState, useEffect } from "react";

export default function Dash() {
  const [isNavActive, setNavActive] = useState(false);
  const [userData, setUserData] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0.0);
  const [profit, setProfit] = useState(0.0);
  const navigate = useNavigate();

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  function closeNavigation() {
    setNavActive(false);
  }

  const statusLabels = {
    success: "Success",
    failed: "Failed",
    progress: "Processing",
    pending: "Pending",
  };

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
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = window.localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:3001/userData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ token }),
        });
        const data = await response.json();
        if (data.data === "token expired") {
          alert("Token expired, login again");
          window.localStorage.clear();
          window.location.href = "/login";
        } else {
          setUserData(data.data);
          setBalance(data.data.balance || 0); // Initialize balance
          setProfit(data.data.profit || 0); // Initialize profit
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = window.localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:3001/transactions", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await response.json();
        if (data.status === "ok") {
          const fetchedTransactions = data.data;
          setTransactions(fetchedTransactions);

          // Initialize balance and profit from userData if not already set
          let newBalance = userData.balance || 0;
          let newProfit = userData.profit || 0;

          // Correct balance and profit calculations
          fetchedTransactions.forEach((transaction) => {
            if (transaction.status.toLowerCase() === "success") {
              if (transaction.type.toLowerCase() === "profit") {
                newProfit += transaction.amount;
              } else if (transaction.type.toLowerCase() === "withdrawal") {
                newBalance -= transaction.amount;
              } else {
                newBalance += transaction.amount;
              }
            }
          });

          setBalance(newBalance);
          setProfit(newProfit);
        } else {
          console.error("Error fetching transactions:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTransactions();
  }, [userData]); // Dependency on userData to ensure proper balance initialization

  return (
    <>
      <div className="container">
        <div className={`navigation ${isNavActive ? "active" : ""}`}>
          <div className="navbar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="xmark">
          <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 
          25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 
          45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" onClick={closeNavigation} 
          width={"35px"}
          /></svg>
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
            </div>
          </div>

          <div className="user-content">
            <div className="cardBox">
              <div className="head">
                <div className="card">
                  <div className="tab-1">
                    <div className="cardName">Balance:</div>
                    <div className="numbers">${balance.toFixed(2)}</div>
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
                    <div className="numbers">${profit.toFixed(2)}</div>
                    <div className="bar-2">
                      <button>
                        <Link className="link" to={"./transfer"}>
                          Transfer
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="details">
              <div className="cardHeader">
                <h2>Transactions</h2>
                <div className="recentTransact">
                  {transactions.length === 0 ? (
                    <p className="noTransact">No Transactions</p>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <td>Transaction</td>
                          <td>Amount</td>
                          <td>Status</td>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((transaction, index) => (
                          <tr key={index}>
                            <td> {transaction.type} </td>
                            <td> ${transaction.amount} </td>
                            <td>
                              <span
                                className={`status ${transaction.status.toLowerCase()}`}
                              >
                                {statusLabels[
                                  transaction.status.toLowerCase()
                                ] || transaction.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
