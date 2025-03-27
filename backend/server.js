const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const api_url_apiluna = "https://kapalicarsi.apiluna.org";
const api_url_truncgil = "https://finance.truncgil.com/api/today.json";


app.get("/market", async (req, res) => {
    try {
      const response = await axios.get(api_url_truncgil);
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      res.status(500).json({ error: "Failed to fetch data" });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));