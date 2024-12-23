const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/authRoutes");
const connectDb = require("./utils/connectDb");
const errorMiddleware = require("./middlewares/errorMiddleware");
const bodyParser = require("body-parser");

connectDb();

const PORT = process.env.PORT || 1003;

app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/v1", authRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
