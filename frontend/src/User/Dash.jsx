import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../style/dash.css";
import UserHeader from "../Home/UserHeader";
import Payment from "./Payment";

export default function Dash() {
  const [isNavActive, setNavActive] = useState(false);
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0.0);
  const [profit, setProfit] = useState(0.0);
  const { username } = useParams();
  const navigate = useNavigate();

  const navigateToFund = () => {
    navigate(`/user/${username}/fund`);
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
    try {
      const response = await fetch("http://localhost:3001/saveData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
  }, [username]);  // Added username in dependency array to trigger useEffect when username changes.

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!username) return;
      try {
        const response = await fetch(`http://localhost:3001/transactions/${username}`, {
          method: "GET",
          headers: {
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

          let newBalance = balance || 0;
          let newProfit = profit || 0;

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
  }, [username, balance, profit]);

  return (
    <>
      <div className="container">
       

        <div className={`main ${isNavActive ? "active" : ""}`}>
          <UserHeader/>

          <div className="user-content">
            <div className="cardBox">
              <div className="head">
                <div className="card">
                  <div className="tab-1">
                    <div className="cardName">Balance:</div>
                    <div className="numbers">${balance.toLocaleString(undefined,{ minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="bar-1">
                        
                        <button className="fund" onClick={navigateToFund}>
                        <svg className="plus" xmlns="http://www.w3.org/2000/svg" width={"30px"} viewBox="0 0 448 512" >
                        <path fill="#999" 
                        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 
                        32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 
                        17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 
                        32-32s-14.3-32-32-32l-144 0 0-144z"/>
                        </svg> Fund Account
                      </button>  
                        
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="tab-2">
                    <div className="cardName">Profit:</div>
                    <div className="numbers">${profit.toFixed(2)}</div>
                    <div className="bar-2">
                      
                        <Link className="link" to={"./transfer"}>
                          <button className="fund">Transfer

                          </button>
                        </Link>
                      
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
                          <td>Type</td>
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
