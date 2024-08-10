const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const CustomError = require('./utils/customError');
const authRoutes = require('./routes/auth');
const researchRoutes = require('./routes/research');
const mailingListRoutes = require('./routes/mailingList');
const eventRoutes = require('./routes/event');
const volunteerRoutes = require('./routes/volunteer');
const ApplicantRoutes = require('./routes/applicant');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/researches', researchRoutes);
app.use('/api/mailing', mailingListRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/applicants', ApplicantRoutes);

// Keep alive endpoint
app.get('/keep-alive', (req, res) => {
  res.status(200).send('Server is alive');
});

app.all('*', (req, res, next) => {
  const err = new CustomError(
    404,
    `Welcome To TonyStoryBackendSolutions. Can't find ${req.originalUrl} on the server`
  );

  next(err);
});

// Error handling middleware (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

process.on('unhandledRejection', (err) => {
  console.log(err.name, ':', err.message);
  console.log('Unhandled Rejection Occured! Shutting Down...');
  server.close(() => {
    process.exit(1);
  });
});
