import { Link } from "react-router-dom";
import logo1 from "./assets/logosmall.png";
import xmark from "./assets/xmark.svg";
import "./style/dash.css";
import { useState, useEffect } from "react";


export default function Settings() {
  const [isNavActive, setNavActive] = useState(true);

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }
  const logOut = () => {
    window.localStorage.clear();
  };

  const [image, setImage] = useState("");
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
          window.location.href = "./sign-in";
        }
      });
  }, []);

  useEffect(() => {
    // Fetch images when component mounts
    const fetchImages = async () => {
      const token = window.localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:3001/imageData", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const data = await response.json();
        if (data.status === "ok") {
          setImages(data.data);
        } else {
          console.error("Error fetching images:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchImages();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image[0]);
    
    const token = window.localStorage.getItem("token");

    fetch("http://localhost:3001/upload", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Photo uploaded successfully");
          // Optionally, re-fetch images after upload
          fetchImages();
        } else {
          alert("Error uploading photo");
        }
      })
      .catch((error) => console.error("Upload Error:", error));
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
                <img src={ImageData.filename} alt="profie-photo" />
              </div>
            </div>
          </div>
          <div className="sector">

            <form onSubmit={handleSubmit} className="pics">
            <input id="image" type="file" accept=".jpg, .png, .jpeg" onChange={(e) => setImage(e.target.files)} />
            <br/>
            <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
