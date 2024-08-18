const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const UserModel = require("./models/User");
const FundModel = require("./models/Fund");
const Images = require("./models/Image");

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = "hgdghhsjsjd.ffggeueueueduudjdjdhfdhd.fi}{}65756474";

mongoose.connect("mongodb://127.0.0.1:27017/guardednest");

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.json({ error: "User Not Found" });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) {
    const token = jwt.sign({ username: user.username }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

// Registration endpoint
app.post("/register", async (req, res) => {
  const {
    username,
    fname,
    lname,
    date,
    address,
    country,
    phone,
    email,
    password,
  } = req.body;
  try {
    /*Check if username is taken
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      alert("Username not available");
      return res.status(300).json({ error: "Username not available" });
    }*/
    // Check if email already exists
    
    const existingEmail = await UserModel.findOne({ email });
    const existingUser = await UserModel.findOne({ username });
    if (existingEmail) {
      //alert("User already exists");
      return res.status(400).json({ error: "User already exists" });

    } if(existingUser){
      //alert("Username not available");
      return res.status(300).json({ error: "Username not available" });
    }
    else {
       
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = await UserModel.create({
      username,
      fname,
      lname,
      date,
      address,
      country,
      phone,
      email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  console.log("Received token:", token);
  try {
    if (!token) {
      return res.status(400).json({ error: "Token not provided" });
    }

    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);

    const username = user.username;
    UserModel.findOne({ username: username })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: data });
      });
  } catch (error) {}
});

/* Middleware to verify JWT token and retrieve userId
function verifyToken(req, res, next) {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).json({ error: "Token not provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Failed to authenticate token" });
    }
    req.userId = decoded.userId; // Retrieve userId from decoded token
    next();
  });
}*/

// Endpoint to add funds
app.post("/user/fund", async (req, res) => {
  const { token, amount, plan } = req.body;

  try {
    // Create a new fund entry in the database associated with the user ID
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username; // Extract userId from token
    const newFund = await FundModel.create({ username, amount, plan });
    res.status(201).json(newFund);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to retrieve fund data
app.post("/fundData", async (req, res) => {
  const { token } = req.body;
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username; // Extract username from token

    // Fetch fund data based on username
    FundModel.findOne({ username })
      .then((fund) => {
        if (fund) {
          res.send({ status: "ok", data: fund });
        } else {
          res.send({ status: "error", error: "Fund data not found for the user" });
        }
      })
      .catch((error) => {
        console.error("Error fetching fund data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  } catch (error) {
    console.error("Error decoding token:", error);
    res.status(400).json({ error: "Invalid token" });
  }
});

/*
app.post("/upload", upload.single("image"), async (req, res) => {
  const { token, image } = req.body;

  try {
    
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username; // Extract userId from token
    const newImage = await ImageModel.create({ username, image });
    res.status(201).json(newImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
*/

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../src/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload-image", upload.single("image"), async (req, res) => {
  console.log(req.body);
  const imageName = req.file.filename;

  try {
    await Images.create({ image: imageName });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get("/get-image", async (req, res) => {
  try {
    Images.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.json({ status: error });
  }
});

app.listen(3001, () => {
  console.log("server is running");
});
