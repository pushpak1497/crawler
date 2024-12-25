// server.js
import express from 'express';
import mongoose from 'mongoose';
import crawlerRoutes from './routes/crawler.routes.js';
import dotenv from "dotenv"

const app = express();
dotenv.config({
    path:"./.env"
})


app.use(express.json());
app.use('/api', crawlerRoutes);

mongoose.connect(`${process.env.MONGODB_URI}/crawler`)
  .then(() => {
    console.log("mongodb connected")
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch((error) => console.error('MongoDB connection error:', error));
