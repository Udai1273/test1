const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors()); // Enable CORS to allow frontend requests

// User details (static as per example)
const USER_DETAILS = {
  user_id: "john_doe_17091999",
  email: "john@xyz.com",
  roll_number: "ABCD123",
};

// Route: GET /bfhl
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Route: POST /bfhl
app.post("/bfhl", (req, res) => {
  console.log("Received request body:", req.body);

  // Validate input
  if (!req.body || !req.body.data || !Array.isArray(req.body.data)) {
    return res
      .status(400)
      .json({ error: "Invalid input, expected JSON with 'data' array" });
  }

  const inputData = req.body.data;
  let numbers = [];
  let alphabets = [];

  // Process the input array
  inputData.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (
      typeof item === "string" &&
      item.length === 1 &&
      /^[A-Za-z]$/.test(item)
    ) {
      alphabets.push(item);
    }
  });

  // Determine the highest alphabet (last in A-Z order, case-insensitive)
  let highestAlphabet = [];
  if (alphabets.length > 0) {
    highestAlphabet.push(
      alphabets.sort((a, b) =>
        b.localeCompare(a, undefined, { sensitivity: "base" })
      )[0]
    );
  }

  // Construct response
  const response = {
    is_success: true,
    ...USER_DETAILS,
    numbers,
    alphabets,
    highest_alphabet: highestAlphabet,
  };

  res.status(200).json(response);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
