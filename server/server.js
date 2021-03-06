const express = require('express');
require('dotenv').config({ path: "./config/.env" });
require("./config/db");
const cors = require('cors');

const productRoutes = require("./routes/product.routes");
const commandRoutes = require("./routes/command.routes");
const SAVRequestRoutes = require("./routes/SAVRequest.routes");

const app = express();

const PORT = process.env.PORT | 5000;
const apiUrl = "/shop-clone/api";

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use(apiUrl + "/product", productRoutes);
app.use(apiUrl + "/command", commandRoutes);
app.use(apiUrl + "/savrequest", SAVRequestRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});