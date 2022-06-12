const express = require('express');
const app = express();
const videoRoute = require('./routes/videos');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());

app.use(express.static('public'));

app.use('/videos', videoRoute);

app.listen(port, () => console.log(`Server is listening on ${port}`));