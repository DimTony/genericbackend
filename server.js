const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const setupSocket = require("./utils/socketHandler");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const errorHandler = require("./middleware/errorHandler");
const CustomError = require("./utils/customError");
const applicantRoutes = require("./routes/applicant");
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/event");
const ipRoutes = require("./routes/ip");
const jarradWrigleyRoutes = require("./routes/jarradWrigley");
const lazadaRoutes = require("./routes/lazada");
const mailingListRoutes = require("./routes/mailingList");
const researchRoutes = require("./routes/research");
const volunteerRoutes = require("./routes/volunteer");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(express.json());
app.use(cors());

// Setup socket handlers
setupSocket(io);

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/applicants", applicantRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/ip", ipRoutes);
app.use("/api/jarrad-wrigley", jarradWrigleyRoutes);
app.use("/api/lazada", lazadaRoutes);
app.use("/api/mailing", mailingListRoutes);
app.use("/api/researches", researchRoutes);
app.use("/api/volunteers", volunteerRoutes);

// Keep alive endpoint
app.get("/keep-alive", (req, res) => {
  res.status(200).send("Server is alive");
});

app.all("*", (req, res, next) => {
  const err = new CustomError(
    404,
    `Welcome To TonyStoryBackendSolutions. Can't find ${req.originalUrl} on the server`
  );

  next(err);
});

// Error handling middleware (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection", (err) => {
  console.log(err.name, ":", err.message);
  console.log("Unhandled Rejection Occurred! Shutting Down...");
  server.close(() => {
    process.exit(1);
  });
});
