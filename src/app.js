const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/ai.routes');
const authRoutes = require('./routes/auth');

const app = express();

const corsOptions = {
  origin: 'https://ai-frontend-ivory-nine.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Enable CORS with these options
app.use(cors(corsOptions));

// Handle preflight OPTIONS requests explicitly
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/ai', aiRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
