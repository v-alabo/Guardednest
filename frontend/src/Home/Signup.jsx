import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logosmall.png";
import logo2 from "../assets/logo2.png";
import bar from "../assets/bar.svg";
import xmark from "../assets/xmark.svg";
import goog from "../assets/google.svg";
import "../style/home.css";

export default function Signup() {
  const [username, setUserName] = useState("");
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


    const handleSubmit = async (e) => {
      e.preventDefault();

        /* Basic client-side validation
    if (!username || !fname || !lname || !date || !address || !country || !phone || !email || !password) {
      alert("All fields are required.");
      return;
    }
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Invalid email format.");
      return;
    }
  
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    */

      try {
        const response = await fetch("http://localhost:3001/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            fname,
            lname,
            date,
            address,
            country,
            phone,
            email,
            password,
            balance: "--",
            profit: "--",
          }),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
          // Handle server error
          throw new Error(data.error || 'An unknown error occurred');
        }
    
        if (data.success) {
          alert("Registration Successful");
          navigate("/login");
        } else {
          alert("Registration failed: " + (data.error || 'Unknown error'));
        }
    
      } catch (error) {
        alert("An error occurred: " + error.message);
      }
    };
    
  
  
  const [isNavActive, setNavActive] = useState(false);

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  return (
    <>
      <nav>
        <div className="top">
          <a className="logo" href="home.html">
            <img src={logo} alt="logo" />
          </a>
          <div className="bar" onClick={toggleNavigation}>
            <img src={isNavActive ? xmark : bar} alt="menu" />
          </div>
        </div>
        <ul className={`menu ${isNavActive ? "active" : ""}`}>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <Link to={"/login"} className="book">
            Sign-in
          </Link>
        </ul>
      </nav>

      <div className="reg">
        <div className="form">
          <div className="sect">
            <div className="text3">
              <h1>Join Now</h1>
              <p>
                Join the 1 million people who have already chosen GNF
                <br />
                Licensed and regulated across multiple jurisdictions, we serve
                clients in over 150 countries worldwide.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="form1">
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  required
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="fname">First Name</label>
                <input
                  type="text"
                  id="fname"
                  placeholder="John"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="lname">Last Name</label>
                <input
                  type="text"
                  id="lname"
                  placeholder="Doe"
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="date">Date of birth</label>
                <input
                  type="date"
                  id="date"
                  required
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  placeholder="United States"
                  required
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="Select Country">Select Country</option>
                  <option value="/afghanistan">Afghanistan</option>
                  <option value="/albania">Albania</option>
                  <option value="/algeria">Algeria</option>
                  <option value="/andorra">Andorra</option>
                  <option value="/angola">Angola</option>
                  <option value="/antigua_and_barbuda">
                    Antigua and Barbuda
                  </option>
                  <option value="/argentina">Argentina</option>
                  <option value="/armenia">Armenia</option>
                  <option value="/australia">Australia</option>
                  <option value="/austria">Austria</option>
                  <option value="/azerbaijan">Azerbaijan</option>
                  <option value="/bahamas">Bahamas</option>
                  <option value="/bahrain">Bahrain</option>
                  <option value="/bangladesh">Bangladesh</option>
                  <option value="/barbados">Barbados</option>
                  <option value="/belarus">Belarus</option>
                  <option value="/belgium">Belgium</option>
                  <option value="/belize">Belize</option>
                  <option value="/benin">Benin</option>
                  <option value="/bhutan">Bhutan</option>
                  <option value="/bolivia">Bolivia</option>
                  <option value="/bosnia_and_herzegovina">
                    Bosnia and Herzegovina
                  </option>
                  <option value="/botswana">Botswana</option>
                  <option value="/brazil">Brazil</option>
                  <option value="/brunei">Brunei</option>
                  <option value="/bulgaria">Bulgaria</option>
                  <option value="/burkina_faso">Burkina Faso</option>
                  <option value="/burundi">Burundi</option>
                  <option value="/cabo_verde">Cabo Verde</option>
                  <option value="/cambodia">Cambodia</option>
                  <option value="/cameroon">Cameroon</option>
                  <option value="/canada">Canada</option>
                  <option value="/central_african_republic">
                    Central African Republic
                  </option>
                  <option value="/chad">Chad</option>
                  <option value="/chile">Chile</option>
                  <option value="/china">China</option>
                  <option value="/colombia">Colombia</option>
                  <option value="/comoros">Comoros</option>
                  <option value="/congo">Congo</option>
                  <option value="/costa_rica">Costa Rica</option>
                  <option value="/croatia">Croatia</option>
                  <option value="/cuba">Cuba</option>
                  <option value="/cyprus">Cyprus</option>
                  <option value="/czech_republic">Czech Republic</option>
                  <option value="/denmark">Denmark</option>
                  <option value="/djibouti">Djibouti</option>
                  <option value="/dominica">Dominica</option>
                  <option value="/dominican_republic">
                    Dominican Republic
                  </option>
                  <option value="/east_timor">East Timor</option>
                  <option value="/ecuador">Ecuador</option>
                  <option value="/egypt">Egypt</option>
                  <option value="/el_salvador">El Salvador</option>
                  <option value="/equatorial_guinea">Equatorial Guinea</option>
                  <option value="/eritrea">Eritrea</option>
                  <option value="/estonia">Estonia</option>
                  <option value="/ethiopia">Ethiopia</option>
                  <option value="/fiji">Fiji</option>
                  <option value="/finland">Finland</option>
                  <option value="/france">France</option>
                  <option value="/gabon">Gabon</option>
                  <option value="/gambia">Gambia</option>
                  <option value="/georgia">Georgia</option>
                  <option value="/germany">Germany</option>
                  <option value="/ghana">Ghana</option>
                  <option value="/greece">Greece</option>
                  <option value="/grenada">Grenada</option>
                  <option value="/guatemala">Guatemala</option>
                  <option value="/guinea">Guinea</option>
                  <option value="/guinea_bissau">Guinea-Bissau</option>
                  <option value="/guyana">Guyana</option>
                  <option value="/haiti">Haiti</option>
                  <option value="/honduras">Honduras</option>
                  <option value="/hungary">Hungary</option>
                  <option value="/iceland">Iceland</option>
                  <option value="/india">India</option>
                  <option value="/indonesia">Indonesia</option>
                  <option value="/iran">Iran</option>
                  <option value="/iraq">Iraq</option>
                  <option value="/ireland">Ireland</option>
                  <option value="/israel">Israel</option>
                  <option value="/italy">Italy</option>
                  <option value="/ivory_coast">Ivory Coast</option>
                  <option value="/jamaica">Jamaica</option>
                  <option value="/japan">Japan</option>
                  <option value="/jordan">Jordan</option>
                  <option value="/kazakhstan">Kazakhstan</option>
                  <option value="/kenya">Kenya</option>
                  <option value="/kiribati">Kiribati</option>
                  <option value="/kosovo">Kosovo</option>
                  <option value="/kuwait">Kuwait</option>
                  <option value="/kyrgyzstan">Kyrgyzstan</option>
                  <option value="/laos">Laos</option>
                  <option value="/latvia">Latvia</option>
                  <option value="/lebanon">Lebanon</option>
                  <option value="/lesotho">Lesotho</option>
                  <option value="/liberia">Liberia</option>
                  <option value="/libya">Libya</option>
                  <option value="/liechtenstein">Liechtenstein</option>
                  <option value="/lithuania">Lithuania</option>
                  <option value="/luxembourg">Luxembourg</option>
                  <option value="/macedonia">Macedonia</option>
                  <option value="/madagascar">Madagascar</option>
                  <option value="/malawi">Malawi</option>
                  <option value="/malaysia">Malaysia</option>
                  <option value="/maldives">Maldives</option>
                  <option value="/mali">Mali</option>
                  <option value="/malta">Malta</option>
                  <option value="/marshall_islands">Marshall Islands</option>
                  <option value="/mauritania">Mauritania</option>
                  <option value="/mauritius">Mauritius</option>
                  <option value="/mexico">Mexico</option>
                  <option value="/micronesia">Micronesia</option>
                  <option value="/moldova">Moldova</option>
                  <option value="/monaco">Monaco</option>
                  <option value="/mongolia">Mongolia</option>
                  <option value="/montenegro">Montenegro</option>
                  <option value="/morocco">Morocco</option>
                  <option value="/mozambique">Mozambique</option>
                  <option value="/myanmar">Myanmar</option>
                  <option value="/namibia">Namibia</option>
                  <option value="/nauru">Nauru</option>
                  <option value="/nepal">Nepal</option>
                  <option value="/netherlands">Netherlands</option>
                  <option value="/new_zealand">New Zealand</option>
                  <option value="/nicaragua">Nicaragua</option>
                  <option value="/niger">Niger</option>
                  <option value="/nigeria">Nigeria</option>
                  <option value="/north_korea">North Korea</option>
                  <option value="/norway">Norway</option>
                  <option value="/oman">Oman</option>
                  <option value="/pakistan">Pakistan</option>
                  <option value="/palau">Palau</option>
                  <option value="/palestine">Palestine</option>
                  <option value="/panama">Panama</option>
                  <option value="/papua_new_guinea">Papua New Guinea</option>
                  <option value="/paraguay">Paraguay</option>
                  <option value="/peru">Peru</option>
                  <option value="/philippines">Philippines</option>
                  <option value="/poland">Poland</option>
                  <option value="/portugal">Portugal</option>
                  <option value="/qatar">Qatar</option>
                  <option value="/romania">Romania</option>
                  <option value="/russia">Russia</option>
                  <option value="/rwanda">Rwanda</option>
                  <option value="/saint_kitts_and_nevis">
                    Saint Kitts and Nevis
                  </option>
                  <option value="/saint_lucia">Saint Lucia</option>
                  <option value="/saint_vincent_and_the_grenadines">
                    Saint Vincent and the Grenadines
                  </option>
                  <option value="/samoa">Samoa</option>
                  <option value="/san_marino">San Marino</option>
                  <option value="/sao_tome_and_principe">
                    Sao Tome and Principe
                  </option>
                  <option value="/saudi_arabia">Saudi Arabia</option>
                  <option value="/senegal">Senegal</option>
                  <option value="/serbia">Serbia</option>
                  <option value="/seychelles">Seychelles</option>
                  <option value="/sierra_leone">Sierra Leone</option>
                  <option value="/singapore">Singapore</option>
                  <option value="/slovakia">Slovakia</option>
                  <option value="/slovenia">Slovenia</option>
                  <option value="/solomon_islands">Solomon Islands</option>
                  <option value="/somalia">Somalia</option>
                  <option value="/south_africa">South Africa</option>
                  <option value="/south_korea">South Korea</option>
                  <option value="/south_sudan">South Sudan</option>
                  <option value="/spain">Spain</option>
                  <option value="/sri_lanka">Sri Lanka</option>
                  <option value="/sudan">Sudan</option>
                  <option value="/suriname">Suriname</option>
                  <option value="/swaziland">Swaziland</option>
                  <option value="/sweden">Sweden</option>
                  <option value="/switzerland">Switzerland</option>
                  <option value="/syria">Syria</option>
                  <option value="/taiwan">Taiwan</option>
                  <option value="/tajikistan">Tajikistan</option>
                  <option value="/tanzania">Tanzania</option>
                  <option value="/thailand">Thailand</option>
                  <option value="/togo">Togo</option>
                  <option value="/tonga">Tonga</option>
                  <option value="/trinidad_and_tobago">
                    Trinidad and Tobago
                  </option>
                  <option value="/tunisia">Tunisia</option>
                  <option value="/turkey">Turkey</option>
                  <option value="/turkmenistan">Turkmenistan</option>
                  <option value="/tuvalu">Tuvalu</option>
                  <option value="/uganda">Uganda</option>
                  <option value="/ukraine">Ukraine</option>
                  <option value="/united_arab_emirates">
                    United Arab Emirates
                  </option>
                  <option value="/united_kingdom">United Kingdom</option>
                  <option value="/united_states">United States</option>
                  <option value="/uruguay">Uruguay</option>
                  <option value="/uzbekistan">Uzbekistan</option>
                  <option value="/vanuatu">Vanuatu</option>
                  <option value="/vatican_city">Vatican City</option>
                  <option value="/venezuela">Venezuela</option>
                  <option value="/vietnam">Vietnam</option>
                  <option value="/yemen">Yemen</option>
                  <option value="/zambia">Zambia</option>
                  <option value="/zimbabwe">Zimbabwe</option>
                </select>
              </div>

              <div>
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder=""
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="test@gmail.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" id="signup">
                Register
              </button>
            </form>

            <div className="signup">
              <p>
                {" "}
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
            <div className="divider">
              <span className="or">or</span>
            </div>
            <div className="google-sect">
              <Link href="#">
                <span>
                  <img src={goog} alt="google icon" />
                </span>
                Continue with google{" "}
              </Link>
              <br />
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="foot">
          <div className="col0">
            <img src={logo2} alt="logo" />
            <h3>
              Welcome to our investment site! We offer the best,
              <br />
              most affordable products and services around.
              <br />
              Shop now and start finding great deals!
            </h3>
          </div>

          <div className="col1">
            <ul>
              <p>Quick link</p>
              <li>
                <Link to={"/home"}>Home</Link>
              </li>
              <li>
                <Link to={"/about"}>About</Link>
              </li>
              <li>
                <Link to={"/services"}>Services</Link>
              </li>
              <li>
                <Link to={"/contact"}>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="col2">
            <ul>
              <p>Account</p>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
              <li>
                <Link to={"/register"}>Sign up</Link>
              </li>
              <li>
                <Link to={"/human-rights"}>Human Rights Policy</Link>
              </li>
              <li>
                <Link to={"/support"}>Support Center</Link>
              </li>
            </ul>
          </div>
          <div className="col3">
            <ul>
              <p>Support</p>
              <li>
                <Link to={"/policy"}>Privacy Policy</Link>
              </li>
              <li>
                <Link to={"/terms"}>Terms&Conditions</Link>
              </li>
              <li>
                <Link to={"/faq"}>FAQs</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="copyright">
          <h3>© 2023 All Rights Reserved By GNF</h3>
        </div>
      </footer>
    </>
  );
}
