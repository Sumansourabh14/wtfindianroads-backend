const http = require("http");
const { Server } = require("socket.io");
const express = require("express");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("socket.io connection established", socket.id);

  socket.on("send-location", (data) => {
    io.emit("location", { id: socket.id, ...data });
  });
});

const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/authRoutes");
const dataRoutes = require("./routes/dataRoutes");
const userRoutes = require("./routes/userRoutes");
const videoRoutes = require("./routes/videoRoutes");
const discussionRoutes = require("./routes/discussionRoutes");
const commentRoutes = require("./routes/commentRoutes");
const connectDb = require("./utils/connectDb");
const errorMiddleware = require("./middlewares/errorMiddleware");
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require("node-cron");
const { pingServer } = require("./utils/pingServer");

connectDb();

cron.schedule("*/15 * * * *", () => {
  pingServer();
});

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
app.use("/api/v1/comment", commentRoutes);
app.use("/api/v1/data", dataRoutes);
app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
