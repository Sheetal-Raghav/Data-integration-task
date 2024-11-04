const express = require("express");
const app = express();

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const caseRoutes = require('./routes/caseRoutes');
const morgan=require("morgan")

const PORT = process.env.PORT || 4000;

dotenv.config();
database.connect();

app.use(morgan("dev"))
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/v1/cases", caseRoutes);


app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running ...",
  });
});

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
});

module.exports = app;