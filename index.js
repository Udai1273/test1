const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// ✅ GET request for "/bfhl"
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// ✅ POST request for "/bfhl"
app.post("/bfhl", (req, res) => {
  try {
    const { name, dob, email, roll_number, data } = req.body;

    if (!name || !dob || !email || !roll_number || !data) {
      return res
        .status(400)
        .json({ is_success: false, message: "Missing required fields" });
    }

    // Extract numbers and alphabets from data array
    const numbers = data.filter((item) => typeof item === "number");
    const alphabets = data.filter((item) => typeof item === "string");

    // Format user ID
    const user_id =
      name.toLowerCase().replace(/ /g, "_") + "_" + dob.replace(/-/g, "");

    // Return response
    res.json({
      is_success: true,
      user_id,
      email,
      college_roll_number: roll_number,
      numbers,
      alphabets,
    });
  } catch (error) {
    res
      .status(500)
      .json({ is_success: false, message: "Internal server error" });
  }
});

// ✅ Default route for "/"
app.get("/", (req, res) => {
  res.send("Welcome to my API! Try /bfhl for responses.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
