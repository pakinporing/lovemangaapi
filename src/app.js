require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const { config } = require('dotenv');
const authRoute = require('./routes/auth-route');
const notFoundMiddleware = require('./middlewares/not-found');
const errorMiddleware = require('./middlewares/error');
const mangaChapterRoute = require('./routes/manga-chapter-route');
const mangaRoute = require('./routes/manga-route');
const allMangaRoute = require('./routes/all-manga-route');

// const { sequelize } = require('./models');
// sequelize.sync({ alter: true });

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/manga-chapter', mangaChapterRoute);
app.use('/manga', mangaRoute);
app.use('/allmanga', allMangaRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server run on ${port}`));
