import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import logo1 from "../assets/logosmall.png";
import xmark from "../assets/xmark.svg";
import "../style/dash.css";

function Fund() {
  const [isNavActive, setNavActive] = useState(false);
  const [plan, setPlan] = useState("");
  const [amount, setAmount] = useState("");
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();
  const { username } = useParams();

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

  // Toggle navigation menu
  const toggleNavigation = () => {
    setNavActive(!isNavActive);
  };

  // Close navigation menu
  const closeNavigation = () => {
    setNavActive(false);
  };

  // Log out user and save balance and profit
  const logOut = async () => {
    const token = window.localStorage.getItem("token");
    if (!token){
      alert("No token found. Please log in again.");
  navigate("/login"); 
  return;
    }
    try {
      const response = await fetch("http://localhost:3001/saveData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        // Assuming balance and profit are part of the userData
        body: JSON.stringify({ 
          balance: userData.balance, 
          profit: userData.profit 
        }),
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

  // Handle plan selection change
  const handlePlanChange = (e) => {
    const selectedPlan = e.target.value;
    let selectedAmount = "";

    switch (selectedPlan) {
      case "Starter":
        selectedAmount = "100";
        break;
      case "Regular":
        selectedAmount = "500";
        break;
      case "Premium":
        selectedAmount = "2500";
        break;
      case "Classic":
        selectedAmount = "5500";
        break;
      default:
        selectedAmount = "";
        break;
    }

    setAmount(selectedAmount);
    setPlan(selectedPlan);
  };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const token = window.localStorage.getItem("token");

  //   try {
  //     const response = await fetch("http://localhost:3001/user/fund", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         "Authorization": `Bearer ${token}`, // Include token as Authorization header
  //       },
  //       body: JSON.stringify({ plan, amount }),
  //     });

  //     const data = await response.json();

  //     if (data.status === "ok") {
  //       alert("Funded Successfully");
  //       navigate(`/user/${username}/fund/payment`); // Navigate to payment page after successful funding
  //     } else {
  //       console.error("Error funding account:", data.error);
  //     }
  //   } catch (error) {
  //     console.error("Error adding funds:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Retrieve the token from localStorage
    const token = window.localStorage.getItem("token");
  
    if (!token) {
      alert("No token found. Please log in again.");
      navigate("/login"); // Redirect to login if no token found
      return;
    }
  
    try {
      // Send POST request to fund the account, with token in Authorization header
      const response = await fetch("http://localhost:3001/user/fund", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`, // Include token in request headers
        },
        body: JSON.stringify({ plan, amount }), // Send the selected plan and amount
      });
  
      const data = await response.json();
      console.log("API Response Data:", data);


      if (data._id) {
        alert("Funded Successfully");
        console.log("Navigating to payment page...");
navigate(`/user/${username}/fund/payment`); // Navigate to payment page after successful funding
      } else {
        console.error("Error funding account:", data.error || 'unknown error');
      }
    } catch (error) {
      console.error("Error adding funds:", error);
    }
  };
  

  return (
    <div className="container">
      <div className={`navigation ${isNavActive ? "active" : ""}`}>
        <div className="navbar">
          <img className="logo1" src={logo1} alt="logo" />
          <img className="xmark" src={xmark} alt="close" onClick={closeNavigation} />
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
            <Link to="/user/withdrawals">
              <span className="icon">
                <ion-icon name="wallet-outline"></ion-icon>
              </span>
              <span className="title">Withdrawals</span>
            </Link>
          </li>
          <li>
            <Link to="/user/transactions">
              <span className="icon">
                <ion-icon name="stats-chart-outline"></ion-icon>
              </span>
              <span className="title">Transactions</span>
            </Link>
          </li>
          <li>
            <Link to="/user/settings">
              <span className="icon">
                <ion-icon name="settings-outline"></ion-icon>
              </span>
              <span className="title">Settings</span>
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={logOut}>
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
            <p>Welcome {userData ? userData.fname : "User"}</p>
          </div>
        </div>

        <div className="tab">
          <div className="bank">
            <div className="text5">
              <h2>Fund Account</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="plan">Plan</label>
              <br />
              <select id="plan" value={plan} onChange={handlePlanChange}>
                <option value="Select Plan">Select Plan</option>
                <option value="Starter">Starter</option>
                <option value="Regular">Regular</option>
                <option value="Premium">Premium</option>
                <option value="Classic">Classic</option>
              </select>
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <button className="go">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fund;
