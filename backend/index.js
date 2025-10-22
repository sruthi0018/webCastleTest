require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes/mainRoutes");
const { startCron } = require("./services/cronServices");

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log(err));

startCron(); 

app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`));
