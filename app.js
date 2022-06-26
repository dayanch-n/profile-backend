import dotenv from "dotenv"
import path from 'path'
import { fileURLToPath } from 'url';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

import express from "express";
import bodyParser from 'body-parser';
import mongoose from "mongoose";

import userRoutes from './routes/user.js';


const app = express();
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));


app.use(userRoutes);


mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.PASSWORD}@cluster0.ynx918k.mongodb.net/simple-profile?retryWrites=true&w=majority`,
)
  .then((_) => {
    app.listen(3000);
  })
  .catch(err => console.log(err));