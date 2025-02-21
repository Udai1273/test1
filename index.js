const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// POST route
app.post("/bfhl", (req, res) => {
  try {
    const { name, dob, email, roll_number, data } = req.body;
    if (!name || !dob || !data) {
      return res
        .status(400)
        .json({ is_success: false, message: "Missing fields" });
    }
    const user_id = `${name.replace(/\s/g, "_").toLowerCase()}_${dob.replace(
      /-/g,
      ""
    )}`;
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => /^[A-Za-z]+$/.test(item));
    res.json({
      is_success: true,
      user_id,
      email,
      college_roll_number: roll_number,
      numbers,
      alphabets,
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: error.message });
  }
});

// GET route
app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
