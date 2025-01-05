const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const videoRoutes = require("./routes/videoRoutes");
const discussionRoutes = require("./routes/discussionRoutes");
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

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/video", videoRoutes);
app.use("/api/v1/discussion", discussionRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
