const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const users = require('./controllers/api/users');
const profile = require('./controllers/api/profile');
const posts = require('./controllers/api/posts');
const app = express();

//DB Config
const db = process.env.MONGO_URI;

//Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(() => console.log(err));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello'));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
