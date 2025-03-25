const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/market", async (req, res) => {
    try {
      const response = await axios.get("https://kapalicarsi.apiluna.org");
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      res.status(500).json({ error: "Failed to fetch data" });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));