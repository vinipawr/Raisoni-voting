const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const electionRoutes = require('./routes/electionRoutes');
const voteRoutes = require('./routes/voteRoutes');

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/elections', electionRoutes);
app.use('/api/votes', voteRoutes);

// Create HTTP server for Socket.io
const http = require('http').createServer(app);

// Socket.io setup
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', socket => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Make Socket.io accessible in controllers
app.set('io', io);

// Start the server
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
