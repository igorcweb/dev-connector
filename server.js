const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const users = require('./controllers/api/users');
const profile = require('./controllers/api/profile');
const posts = require('./controllers/api/posts');
const app = express();
const PORT = process.env.PORT || 3000;
const passport = require('passport');

//Express native body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//DB Config
const db = process.env.MONGO_URI;

//Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(() => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
