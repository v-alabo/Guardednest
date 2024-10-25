import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import logo1 from "../assets/logosmall.png";
import xmark from "../assets/xmark.svg";
import '../style/dash.css';


const UserHeader = () => {
    const [isNavActive, setNavActive] = useState(false);
    const [userData, setUserData] = useState(null);
    const { username } = useParams();
    const navigate = useNavigate();

    function toggleNavigation() {
        setNavActive(!isNavActive);
      }

      function closeNavigation() {
        setNavActive(false);
      }
      
      const logOut = async () => {
        if (typeof balance === "undefined" || typeof profit === "undefined") {
          console.error("Balance or profit is not defined.");
          return; // Prevent the logOut function from continuing if they're undefined
        }
      
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
      }, [username]); 
  return (
    <div>

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


<div className="topbar">
            <div className="toggle" onClick={toggleNavigation}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32-14.3 32-32z" />
              </svg>
            </div>

            <div className="user1">
              {/* Check if userData is available before displaying */}
              <p>Welcome {userData ? userData.fname : "User"}</p>
            </div>
          </div>

    </div>
  )
}

export default UserHeader