const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

const API_URL = "http://your-bot-ip:3000/pairing-code"; // Replace with your bot endpoint

app.use(cors());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index", { code: null });
});

app.post("/pair", async (req, res) => {
  const phone = req.body.phone;

  try {
    const response = await fetch(`${API_URL}?phone=${encodeURIComponent(phone)}`);
    const data = await response.json();
    res.render("index", { code: data.code || "Invalid" });
  } catch (error) {
    console.error("Error:", error);
    res.render("index", { code: "Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
