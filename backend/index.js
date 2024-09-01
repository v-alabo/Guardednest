const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./models/User");
const fundModel = require("./models/Fund");
const transactionModel = require("./models/Transact");
const withdrawModel = require("./models/Withdraw");
const incomeModel= require("./models/Income");
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

app.get('/user/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    res.json({ status: 'ok', data: user });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error fetching user: ' + error.message });
  }
});



app.post("/saveData", (req, res) => {
  const { balance, profit } = req.body;
  const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;
  // Save balance and profit to the database
  const saveData =  incomeModel.updateOne({ username}, { balance, profit }, { new: true, upsert: true })
    .then(() => res.json({ status: "ok", data: saveData }))
    .catch((error) =>
      res.json({ status: "error", error: "Failed to save user data" })
    );
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
    // Decode the token to get the username
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;

    // Use findOneAndUpdate to either update an existing document or create a new one
    const updatedFund = await fundModel.findOneAndUpdate(
      { username },                   
      { amount, plan },                
      { new: true, upsert: true }      // Return the updated document, and create if it doesn't exist
    );

    res.status(201).json(updatedFund);
  } catch (error) {
    console.error("Error updating or creating fund:", error);
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

app.post("/transactions", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    console.error("No token provided");
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;


    const { type, status, amount } = req.body;
   
    const newTransaction = new transactionModel({
      username,
      type,
      amount,
      status,
    });

    await newTransaction.save();

    res.json({ status: "ok", data: newTransaction });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res
      .status(500)
      .json({ status: "error", error: "Failed to create transaction" });
  }
});

app.get("/transactions/:username", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    console.error("No token provided");
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;

    // Fetch transactions for the user
    const transactions = await transactionModel.find({ username });

    if (!transactions || transactions.length === 0) {
      return res
        .status(404)
        .json({ status: "error", error: "No transactions found" });
    }

    res.json({ status: "ok", data: transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res
      .status(500)
      .json({ status: "error", error: "Failed to fetch transactions" });
  }
});

app.patch("/transactions-update", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    console.error("No token provided");
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    // Update the specific transaction for the user
    const updatedTransaction = await transactionModel.find(
      { username },
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedTransaction) {
      return res.status(404).json({ status: "error", error: "Transaction not found or does not belong to the user" });
    }

    res.json({ status: "ok", data: updatedTransaction });
  } catch (error) {
    console.error("Error updating transaction status:", error);
    res.status(500).json({ status: "error", error: "Failed to update status" });
  }
});

// Add this route to your backend
app.post("/transactions-add", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const { username, type, amount, status } = req.body; // Extract transaction details from the request body

    // Check if the required fields are present
    if (!username || !type || !amount || !status) {
      return res.status(400).json({ status: "error", error: "Missing required fields" });
    }

    // Create a new transaction
    const newTransaction = new transactionModel({
      username,
      type,
      amount,
      status,
    });

    await newTransaction.save(); // Save the new transaction to the database

    res.json({ status: "ok", data: newTransaction });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ status: "error", error: "Failed to add transaction" });
  }
});



app.post("/withdraw", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    console.error("No token provided");
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;


    const { acctnum, amount, acctname, bank, paypal, wallet, cashtag } = req.body;
    const newWithdrawal = new withdrawModel({
      username,
      acctname,
      acctnum,
      amount,
      bank,
      paypal,
      wallet,
      cashtag 
    });

    await newWithdrawal.save();

    res.json({ status: "ok", data: newWithdrawal });
  } catch (error) {
    console.error("Error creating newWithdrawal:", error);
    res
      .status(500)
      .json({ status: "error", error: "Failed to create newWithdrawal" });
  }
});

app.post("/withdraw-cashapp", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    console.error("No token provided");
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;


    const { cashtag, amount, } = req.body;
    const newCashapp = new cashAppModel({
      username,
      cashtag,
      amount
    });

    await newCashapp.save();

    res.json({ status: "ok", data: newCashapp });
  } catch (error) {
    console.error("Error creating newCashapp:", error);
    res
      .status(500)
      .json({ status: "error", error: "Failed to create newCashapp" });
  }
});

app.post("/withdraw-crypto", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    console.error("No token provided");
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;


    const { wallet, amount, } = req.body;
    const newCrypto = new cryptoModel({
      username,
      wallet,
      amount
    });

    await newCrypto.save();

    res.json({ status: "ok", data: newCrypto });
  } catch (error) {
    console.error("Error creating newCrypto:", error);
    res
      .status(500)
      .json({ status: "error", error: "Failed to create newCrypto" });
  }
});

app.post("/withdraw-paypal", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    console.error("No token provided");
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;


    const { paypal, amount, } = req.body;
    const newPayPal = new payPalModel({
      username,
      paypal,
      amount
    });

    await newPayPal.save();

    res.json({ status: "ok", data: newPayPal });
  } catch (error) {
    console.error("Error creating newPayPal:", error);
    res
      .status(500)
      .json({ status: "error", error: "Failed to create newPayPal" });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
