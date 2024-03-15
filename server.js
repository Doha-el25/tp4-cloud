const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/user');
const auteurRoutes = require('./routes/auteur');
const editeurRoutes = require('./routes/editeur');
const livreRoutes = require('./routes/livre');
const port = process.env.PORT;
const urlMongoose = process.env.URL_MONGOOSE;
const dbname = process.env.DBNAME;
const token = process.env.TOKEN;
const app = express();
app.use(express.json());
app.use('/user', userRoutes);
app.use('/auteur', auteurRoutes);
app.use('/editeur', editeurRoutes);
app.use('/livre', livreRoutes);
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});