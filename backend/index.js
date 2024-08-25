const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const userModel = require("./models/User");
const fundModel = require("./models/Fund");
const imageModel = require("./models/Image");
const { connectDB } = require("./config/db");

//Middleware
const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "hgdghhsjsjd.ffggeueueueduudjdjdhfdhd.fi}{}65756474";

// db connect
connectDB();

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ username: user.username }, JWT_SECRET);
      return res.status(200).json({ status: "ok", data: token });
    }
    res.status(401).json({ status: "error", error: "Invalid Password" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Registration endpoint
app.post("/signup", async (req, res) => {
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
    const existingEmail = await userModel.findOne({ email });
    const existingUser = await userModel.findOne({ username });

    if (existingEmail) {
      return res.status(400).json({ error: "Email already in use" });
    }
    if (existingUser) {
      return res.status(409).json({ error: "Username not available" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await userModel.create({
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

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
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
    const data = await userModel.findOne({ username: username });

    if (data) {
      return res.status(200).json({ status: "ok", data: data });
    } else {
      return res
        .status(404)
        .json({ status: "error", error: "User data not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(400).json({ error: "Invalid token" });
  }
});

// Endpoint to add funds
app.post("/user/fund", async (req, res) => {
  const { token, amount, plan } = req.body;

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;
    const newFund = await fundModel.create({ username, amount, plan });
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
    const username = decodedToken.username;
    const fund = await fundModel.findOne({ username });

    if (fund) {
      return res.status(200).json({ status: "ok", data: fund });
    } else {
      return res
        .status(404)
        .json({ status: "error", error: "Fund data not found for the user" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(400).json({ error: "Invalid token" });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../frontend/src/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    console.error("No token provided");
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;

    // Log file info for debugging
    console.log('File info:', req.file);

    const image_filename = req.file.filename;
    const image_path = req.file.path; // Full path to the file
    const image_url = `http://localhost:3001/uploads/${image_filename}`; // Construct URL if needed

    const image = new imageModel({
      username: req.body.username || username, // Default to token username if not provided in body
      path: image_path,
      filename: image_filename,
      url: image_url
    });

    try {
      await image.save();
      res.status(201).json({ success: true, message: "Photo added", url: image_url });
    } catch (error) {
      console.error("Error saving image:", error);
      res.status(500).json({ success: false, message: "Error saving photo" });
    }

  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
});


app.get("/imageData", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;
    const images = await imageModel.findOne({ username });
    return res.status(200).json({ status: "ok", data: images });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
