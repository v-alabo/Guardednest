import { Link } from "react-router-dom";
import logo1 from "../assets/logosmall.png";
import xmark from "../assets/xmark.svg";
import "../style/dash.css";
import { useState, useEffect } from "react";

export default function AdminTransaction() {
  const [isNavActive, setNavActive] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]); // New state to store users
  const [statusUpdates, setStatusUpdates] = useState({});
  const [newTransaction, setNewTransaction] = useState({
    username: "",
    type: "",
    amount: "",
    status: "",
  });
  const [loading, setLoading] = useState(false); // New loading state

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  function closeNavigation() {
    setNavActive(false);
  }

  const logOut = () => {
    window.localStorage.clear();
  };

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const decodedToken = decodeToken(token);
        const username = decodedToken ? decodedToken.username : null;

        if (!username) {
          alert("Invalid or expired token. Please log in again.");
          return;
        }

        const response = await fetch(
          `http://localhost:3001/transactions?username=${username}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (data.status === "ok") {
          setTransactions(data.data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const response = await fetch(`http://localhost:3001/users`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (data.status === "ok") {
          setUsers(data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchTransactions();
    fetchUsers(); // Fetch users when component loads
  }, []);

  const handleStatusChange = async (transactionId) => {
    const newStatus = statusUpdates[transactionId];

    try {
      setLoading(true); // Start loading
      const response = await fetch(
        `http://localhost:3001/transactions-update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ id: transactionId, status: newStatus }),
        }
      );

      const data = await response.json();
      if (data.status === "ok") {
        alert("Status updated successfully");
        setTransactions(
          transactions.map((tx) => (tx._id === data.data._id ? data.data : tx))
        );
        setStatusUpdates((prevUpdates) => ({
          ...prevUpdates,
          [transactionId]: "", // Clear the status update for the updated transaction
        }));
      } else {
        console.error("Error updating status:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Start loading
      const response = await fetch(`http://localhost:3001/transactions-add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newTransaction),
      });

      const data = await response.json();
      if (data.status === "ok") {
        alert("Transaction added successfully");
        setTransactions([...transactions, data.data]); // Append the new transaction to the list
        setNewTransaction({ username: "", type: "", amount: "", status: "" }); // Reset form fields
      } else {
        console.error("Error adding transaction:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleStatusChangeSelect = (transactionId, status) => {
    setStatusUpdates((prevUpdates) => ({
      ...prevUpdates,
      [transactionId]: status,
    }));
  };

  return (
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
            <Link to={"/admin"}>
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to={"/admin/users"}>
              <span className="icon">
                <ion-icon name="wallet-outline"></ion-icon>
              </span>
              <span className="title">Withdrawals</span>
            </Link>
          </li>
          <li>
            <Link to={"/admin/transactions"}>
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
            <p>Welcome</p>
          </div>
        </div>

        <div>
          <h2>Admin Dashboard</h2>
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
                        <td>Type</td>
                        <td>Amount</td>
                        <td>Status</td>
                        <td>Update Status</td>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                          <td>{transaction.username}</td>
                          <td>{transaction.type}</td>
                          <td>${transaction.amount}</td>
                          <td>{transaction.status}</td>
                          <td>
                            <select className="newSelect" 
                              value={
                                statusUpdates[transaction._id] ||
                                transaction.status
                              }
                              onChange={(e) =>
                                handleStatusChangeSelect(
                                  transaction._id,
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Select Status</option>
                              <option value="success">Success</option>
                              <option value="failed">Failed</option>
                              <option value="progress">Processing</option>
                              <option value="pending">Pending</option>
                            </select>
                            <button
                              onClick={() =>
                                handleStatusChange(transaction._id)
                              }
                              disabled={loading}
                            >
                              {loading ? "Updating..." : "Update"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
          <div  className="newTransact">
            <form onSubmit={handleAddTransaction} >
              <select className="newSelect"
                name="username"
                value={newTransaction.username}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Username</option>
                {users.map((user) => (
                  <option key={user._id} value={user.username}>
                    {user.username}
                  </option>
                ))}
              </select>
              <select  className="newSelect"
                name="type"
                value={newTransaction.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Deposit">Deposit</option>
                <option value="Withdrawal">Withdrawal</option>
                <option value="Transfer">Transfer</option>
                <option value="Profit">Profit</option>
              </select>
              <input className="newSelect" 
                type="number"
                name="amount"
                placeholder="Amount"
                value={newTransaction.amount}
                onChange={handleInputChange}
                required
              />
              <select className="newSelect"
                name="status"
                value={newTransaction.status}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Status</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
                <option value="progress">Processing</option>
                <option value="pending">Pending</option>
              </select>
              <button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Transaction"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
