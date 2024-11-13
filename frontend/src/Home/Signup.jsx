import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import goog from "../assets/google.svg";
import eye from "../assets/eye.svg"; // Eye icon for showing password
import eyeOff from "../assets/eye-off.svg"; // Eye icon for hiding password
import "../style/home.css";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const countries = [
  { value: "", label: "Select Country", code: "" },
  { value: "afghanistan", label: "Afghanistan", code: "+93" },
  { value: "albania", label: "Albania", code: "+355" },
  { value: "algeria", label: "Algeria", code: "+213" },
  { value: "andorra", label: "Andorra", code: "+376" },
  { value: "angola", label: "Angola", code: "+244" },
  { value: "antigua_and_barbuda", label: "Antigua and Barbuda", code: "+1-268" },
  { value: "argentina", label: "Argentina", code: "+54" },
  { value: "armenia", label: "Armenia", code: "+374" },
  { value: "australia", label: "Australia", code: "+61" },
  { value: "austria", label: "Austria", code: "+43" },
  { value: "azerbaijan", label: "Azerbaijan", code: "+994" },
  { value: "bahamas", label: "Bahamas", code: "+1-242" },
  { value: "bahrain", label: "Bahrain", code: "+973" },
  { value: "bangladesh", label: "Bangladesh", code: "+880" },
  { value: "barbados", label: "Barbados", code: "+1-246" },
  { value: "belarus", label: "Belarus", code: "+375" },
  { value: "belgium", label: "Belgium", code: "+32" },
  { value: "belize", label: "Belize", code: "+501" },
  { value: "benin", label: "Benin", code: "+229" },
  { value: "bhutan", label: "Bhutan", code: "+975" },
  { value: "bolivia", label: "Bolivia", code: "+591" },
  { value: "bosnia_and_herzegovina", label: "Bosnia and Herzegovina", code: "+387" },
  { value: "botswana", label: "Botswana", code: "+267" },
  { value: "brazil", label: "Brazil", code: "+55" },
  { value: "brunei", label: "Brunei", code: "+673" },
  { value: "bulgaria", label: "Bulgaria", code: "+359" },
  { value: "burkina_faso", label: "Burkina Faso", code: "+226" },
  { value: "burundi", label: "Burundi", code: "+257" },
  { value: "cabo_verde", label: "Cabo Verde", code: "+238" },
  { value: "cambodia", label: "Cambodia", code: "+855" },
  { value: "cameroon", label: "Cameroon", code: "+237" },
  { value: "canada", label: "Canada", code: "+1" },
  { value: "central_african_republic", label: "Central African Republic", code: "+236" },
  { value: "chad", label: "Chad", code: "+235" },
  { value: "chile", label: "Chile", code: "+56" },
  { value: "china", label: "China", code: "+86" },
  { value: "colombia", label: "Colombia", code: "+57" },
  { value: "comoros", label: "Comoros", code: "+269" },
  { value: "congo", label: "Congo", code: "+242" },
  { value: "congo_democratic_republic", label: "Congo (Democratic Republic)", code: "+243" },
  { value: "costa_rica", label: "Costa Rica", code: "+506" },
  { value: "cote_divoire", label: "Côte d'Ivoire", code: "+225" },
  { value: "croatia", label: "Croatia", code: "+385" },
  { value: "cuba", label: "Cuba", code: "+53" },
  { value: "cyprus", label: "Cyprus", code: "+357" },
  { value: "czech_republic", label: "Czech Republic", code: "+420" },
  { value: "denmark", label: "Denmark", code: "+45" },
  { value: "djibouti", label: "Djibouti", code: "+253" },
  { value: "dominica", label: "Dominica", code: "+1-767" },
  { value: "dominican_republic", label: "Dominican Republic", code: "+1-809" },
  { value: "ecuador", label: "Ecuador", code: "+593" },
  { value: "egypt", label: "Egypt", code: "+20" },
  { value: "el_salvador", label: "El Salvador", code: "+503" },
  { value: "equatorial_guinea", label: "Equatorial Guinea", code: "+240" },
  { value: "eritrea", label: "Eritrea", code: "+291" },
  { value: "estonia", label: "Estonia", code: "+372" },
  { value: "eswatini", label: "Eswatini", code: "+268" },
  { value: "ethiopia", label: "Ethiopia", code: "+251" },
  { value: "fiji", label: "Fiji", code: "+679" },
  { value: "finland", label: "Finland", code: "+358" },
  { value: "france", label: "France", code: "+33" },
  { value: "gabon", label: "Gabon", code: "+241" },
  { value: "gambia", label: "Gambia", code: "+220" },
  { value: "georgia", label: "Georgia", code: "+995" },
  { value: "germany", label: "Germany", code: "+49" },
  { value: "ghana", label: "Ghana", code: "+233" },
  { value: "greece", label: "Greece", code: "+30" },
  { value: "grenada", label: "Grenada", code: "+1-473" },
  { value: "guatemala", label: "Guatemala", code: "+502" },
  { value: "guinea", label: "Guinea", code: "+224" },
  { value: "guinea_bissau", label: "Guinea-Bissau", code: "+245" },
  { value: "guyana", label: "Guyana", code: "+592" },
  { value: "haiti", label: "Haiti", code: "+509" },
  { value: "honduras", label: "Honduras", code: "+504" },
  { value: "hungary", label: "Hungary", code: "+36" },
  { value: "iceland", label: "Iceland", code: "+354" },
  { value: "india", label: "India", code: "+91" },
  { value: "indonesia", label: "Indonesia", code: "+62" },
  { value: "iran", label: "Iran", code: "+98" },
  { value: "iraq", label: "Iraq", code: "+964" },
  { value: "ireland", label: "Ireland", code: "+353" },
  { value: "israel", label: "Israel", code: "+972" },
  { value: "italy", label: "Italy", code: "+39" },
  { value: "jamaica", label: "Jamaica", code: "+1-876" },
  { value: "japan", label: "Japan", code: "+81" },
  { value: "jordan", label: "Jordan", code: "+962" },
  { value: "kazakhstan", label: "Kazakhstan", code: "+7" },
  { value: "kenya", label: "Kenya", code: "+254" },
  { value: "kiribati", label: "Kiribati", code: "+686" },
  { value: "korea_north", label: "Korea (North)", code: "+850" },
  { value: "korea_south", label: "Korea (South)", code: "+82" },
  { value: "kosovo", label: "Kosovo", code: "+383" },
  { value: "kuwait", label: "Kuwait", code: "+965" },
  { value: "kyrgyzstan", label: "Kyrgyzstan", code: "+996" },
  { value: "laos", label: "Laos", code: "+856" },
  { value: "latvia", label: "Latvia", code: "+371" },
  { value: "lebanon", label: "Lebanon", code: "+961" },
  { value: "lesotho", label: "Lesotho", code: "+266" },
  { value: "liberia", label: "Liberia", code: "+231" },
  { value: "libya", label: "Libya", code: "+218" },
  { value: "liechtenstein", label: "Liechtenstein", code: "+423" },
  { value: "lithuania", label: "Lithuania", code: "+370" },
  { value: "luxembourg", label: "Luxembourg", code: "+352" },
  { value: "madagascar", label: "Madagascar", code: "+261" },
  { value: "malawi", label: "Malawi", code: "+265" },
  { value: "malaysia", label: "Malaysia", code: "+60" },
  { value: "maldives", label: "Maldives", code: "+960" },
  { value: "mali", label: "Mali", code: "+223" },
  { value: "malta", label: "Malta", code: "+356" },
  { value: "marshall_islands", label: "Marshall Islands", code: "+692" },
  { value: "mauritania", label: "Mauritania", code: "+222" },
  { value: "mauritius", label: "Mauritius", code: "+230" },
  { value: "mexico", label: "Mexico", code: "+52" },
  { value: "micronesia", label: "Micronesia", code: "+691" },
  { value: "moldova", label: "Moldova", code: "+373" },
  { value: "monaco", label: "Monaco", code: "+377" },
  { value: "mongolia", label: "Mongolia", code: "+976" },
  { value: "montenegro", label: "Montenegro", code: "+382" },
  { value: "morocco", label: "Morocco", code: "+212" },
  { value: "mozambique", label: "Mozambique", code: "+258" },
  { value: "myanmar", label: "Myanmar", code: "+95" },
  { value: "namibia", label: "Namibia", code: "+264" },
  { value: "nauru", label: "Nauru", code: "+674" },
  { value: "nepal", label: "Nepal", code: "+977" },
  { value: "netherlands", label: "Netherlands", code: "+31" },
  { value: "new_zealand", label: "New Zealand", code: "+64" },
  { value: "nicaragua", label: "Nicaragua", code: "+505" },
  { value: "niger", label: "Niger", code: "+227" },
  { value: "nigeria", label: "Nigeria", code: "+234" },
  { value: "north_macedonia", label: "North Macedonia", code: "+389" },
  { value: "norway", label: "Norway", code: "+47" },
  { value: "oman", label: "Oman", code: "+968" },
  { value: "pakistan", label: "Pakistan", code: "+92" },
  { value: "palau", label: "Palau", code: "+680" },
  { value: "panama", label: "Panama", code: "+507" },
  { value: "papua_new_guinea", label: "Papua New Guinea", code: "+675" },
  { value: "paraguay", label: "Paraguay", code: "+595" },
  { value: "peru", label: "Peru", code: "+51" },
  { value: "philippines", label: "Philippines", code: "+63" },
  { value: "poland", label: "Poland", code: "+48" },
  { value: "portugal", label: "Portugal", code: "+351" },
  { value: "qatar", label: "Qatar", code: "+974" },
  { value: "romania", label: "Romania", code: "+40" },
  { value: "russia", label: "Russia", code: "+7" },
  { value: "rwanda", label: "Rwanda", code: "+250" },
  { value: "saint_kitts_and_nevis", label: "Saint Kitts and Nevis", code: "+1-869" },
  { value: "saint_lucia", label: "Saint Lucia", code: "+1-758" },
  { value: "saint_vincent_and_the_grenadines", label: "Saint Vincent and the Grenadines", code: "+1-784" },
  { value: "samoa", label: "Samoa", code: "+685" },
  { value: "san_marino", label: "San Marino", code: "+378" },
  { value: "sao_tome_and_principe", label: "Sao Tome and Principe", code: "+239" },
  { value: "saudi_arabia", label: "Saudi Arabia", code: "+966" },
  { value: "senegal", label: "Senegal", code: "+221" },
  { value: "serbia", label: "Serbia", code: "+381" },
  { value: "seychelles", label: "Seychelles", code: "+248" },
  { value: "sierra_leone", label: "Sierra Leone", code: "+232" },
  { value: "singapore", label: "Singapore", code: "+65" },
  { value: "slovakia", label: "Slovakia", code: "+421" },
  { value: "slovenia", label: "Slovenia", code: "+386" },
  { value: "solomon_islands", label: "Solomon Islands", code: "+677" },
  { value: "somalia", label: "Somalia", code: "+252" },
  { value: "south_africa", label: "South Africa", code: "+27" },
  { value: "south_sudan", label: "South Sudan", code: "+211" },
  { value: "spain", label: "Spain", code: "+34" },
  { value: "sri_lanka", label: "Sri Lanka", code: "+94" },
  { value: "sudan", label: "Sudan", code: "+249" },
  { value: "suriname", label: "Suriname", code: "+597" },
  { value: "sweden", label: "Sweden", code: "+46" },
  { value: "switzerland", label: "Switzerland", code: "+41" },
  { value: "syria", label: "Syria", code: "+963" },
  { value: "taiwan", label: "Taiwan", code: "+886" },
  { value: "tajikistan", label: "Tajikistan", code: "+992" },
  { value: "tanzania", label: "Tanzania", code: "+255" },
  { value: "thailand", label: "Thailand", code: "+66" },
  { value: "timor_leste", label: "Timor-Leste", code: "+670" },
  { value: "togo", label: "Togo", code: "+228" },
  { value: "tonga", label: "Tonga", code: "+676" },
  { value: "trinidad_and_tobago", label: "Trinidad and Tobago", code: "+1-868" },
  { value: "tunisia", label: "Tunisia", code: "+216" },
  { value: "turkey", label: "Turkey", code: "+90" },
  { value: "turkmenistan", label: "Turkmenistan", code: "+993" },
  { value: "tuvalu", label: "Tuvalu", code: "+688" },
  { value: "uganda", label: "Uganda", code: "+256" },
  { value: "ukraine", label: "Ukraine", code: "+380" },
  { value: "united_arab_emirates", label: "United Arab Emirates", code: "+971" },
  { value: "united_kingdom", label: "United Kingdom", code: "+44" },
  { value: "united_states", label: "United States", code: "+1" },
  { value: "uruguay", label: "Uruguay", code: "+598" },
  { value: "uzbekistan", label: "Uzbekistan", code: "+998" },
  { value: "vanuatu", label: "Vanuatu", code: "+678" },
  { value: "venezuela", label: "Venezuela", code: "+58" },
  { value: "vietnam", label: "Vietnam", code: "+84" },
  { value: "yemen", label: "Yemen", code: "+967" },
  { value: "zambia", label: "Zambia", code: "+260" },
  { value: "zimbabwe", label: "Zimbabwe", code: "+263" },
];



export default function Signup() {
  const [username, setUserName] = useState("");
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleCountryChange = (e) => {
    const code = countries.find(country => country.value === e.target.value).code;
    setSelectedCountryCode(code);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic client-side validation
    if (!username || !fname || !lname || !date || !address || !country || !phone || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

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
          balance: "--",  // Assuming you need these fields in the signup
          profit: "--",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'An unknown error occurred');
      }

      if (data.success) {
        // Store the token in local storage or state for further requests
        localStorage.setItem("token", data.token);
        toast.success("Registration Successful");
        navigate("/login");
      } else {
        toast.error("Registration failed: " + (data.error || 'Unknown error'));
      }

    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
  };

  return (
    <>
      <Header />
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
              {[ 
                { label: "Username", type: "text", id: "username", value: username, setter: setUserName },
                { label: "First Name", type: "text", id: "fname", value: fname, setter: setFirstName },
                { label: "Last Name", type: "text", id: "lname", value: lname, setter: setLastName },
                { label: "Date of birth", type: "date", id: "date", value: date, setter: setDate },
                { label: "Address", type: "text", id: "address", value: address, setter: setAddress },
                { label: "Email", type: "email", id: "email", value: email, setter: setEmail },
              ].map(({ label, type, id, value, setter }) => (
                <div key={id}>
                  <label htmlFor={id}>{label}</label>
                  <input
                    type={type}
                    id={id}
                    value={value}
                    required
                    onChange={(e) => setter(e.target.value)}
                  />
                </div>
              ))}
              <div>
               <label htmlFor="phone">Phone</label>
          <span>{selectedCountryCode}</span>
          <input
            type="tel"
            id="phone"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      
              <div>
                <label htmlFor="country">Country</label>
                <select 
                  id="country"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                >
          {countries.map(country => (
            <option key={country.value} value={country.value}>
              {country.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="password-container">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="eye-button" onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}>
                  <img src={showPassword ? eye : eyeOff} alt={showPassword ? "Hide password" : "Show password"} />
                  </div>
                </div>
              </div>
              <button type="submit" id="signup">
                Register
              </button>
            </form>
            <div className="signup">
              <p>
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
                Continue with Google
              </Link>
              <br />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}
