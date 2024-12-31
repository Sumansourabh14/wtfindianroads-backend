const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");
const connectDb = require("./utils/connectDb");
const errorMiddleware = require("./middlewares/errorMiddleware");
const bodyParser = require("body-parser");
const cors = require("cors");

connectDb();

const PORT = process.env.PORT || 1003;

app.use(cors({ origin: [process.env.FRONTEND_URI] }));

app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res, next) => {
  res.json({ success: true });
});

app.use("/api/v1", authRoutes);
app.use("/api/v1/video", videoRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
