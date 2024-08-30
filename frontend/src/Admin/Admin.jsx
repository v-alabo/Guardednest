import { Link, useNavigate } from "react-router-dom";
import logo1 from "../assets/logosmall.png";
import xmark from "../assets/xmark.svg";
import "../style/admin.css";
import { useState, useEffect } from "react";

export default function Admin() {
  const [isNavActive, setNavActive] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  function closeNavigation() {
    setNavActive(false);
  }

  const logOut = () => {
    window.localStorage.clear();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
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

    fetchUsers();
  }, []);

  const handleViewTransactions = (username) => {
    navigate(`/admin/transactions/${username}`);
  };

  const handleUsercard = (username) => {
    navigate(`/admin/usercard/${username}`);
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
          <div>
            <h2>Admin Dashboard</h2>
            <div className="user-cards">
              {users.map((user) => (
                <div className="user-card" key={user._id}>
                  <div className="card-header">
                    <h3 className="username">{user.username}</h3>
                    <p className="email">{user.email}</p>
                  </div>
                  <button
                    className="button"
                    onClick={() => handleViewTransactions(user.username)}
                  >
                    View Transactions
                  </button>
                  <button
                    className="button"
                    onClick={() => handleUsercard(user.username)}
                  >
                    View Usercard
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
