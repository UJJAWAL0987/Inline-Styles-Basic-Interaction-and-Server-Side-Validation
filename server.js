const express = require("express");
const bodyParser = require("body-parser");
const app = express();

require("dotenv").config();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage for validated data
const validatedData = [];

// Route for rendering the form
app.get("/", (req, res) => {
  res.render("index");
});

// Route for handling form submission with server-side validation
app.post("/submit", (req, res) => {
  const { name, email, phone, gender, message } = req.body;

  const errors = [];

  // Server-side validation
  if (!name || name.length < 3)
    errors.push("Name must be at least 3 characters long.");
  if (!email || !email.includes("@"))
    errors.push("Please enter a valid email address.");
  if (!phone || phone.length !== 10 || isNaN(phone))
    errors.push("Please enter a valid 10-digit phone number.");
  if (!gender) errors.push("Please select your gender.");
  if (!message || message.length < 10)
    errors.push("Message must be at least 10 characters long.");

  if (errors.length > 0) {
    // Re-render form with errors
    res.render("index", { errors });
  } else {
    // Store validated data in temporary server-side storage
    validatedData.push({ name, email, phone, gender, message });
    res.render("result", { name, email, phone, gender, message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
