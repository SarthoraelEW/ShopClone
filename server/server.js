const express = require('express');
require('dotenv').config({ path: "./config/.env" });
require("./config/db");

const productRoutes = require("./routes/product.routes");

const app = express();

const PORT = process.env.PORT | 5000;
const apiUrl = "/shop-clone/api";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use(apiUrl + "/product", productRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});