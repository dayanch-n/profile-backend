import dotenv from "dotenv"
import path from 'path'
import { fileURLToPath } from 'url';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

import express from "express";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import cors from 'cors';

import userRoutes from './routes/user.js';


const app = express();

// Automatically allow cross-origin requests
// app.use(cors({origin: '*'}));


app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({limit: '20mb'}))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cors()); //And add this line as well



app.use(userRoutes);


mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.PASSWORD}@cluster0.ynx918k.mongodb.net/simple-profile?retryWrites=true&w=majority`,
)
  .then((_) => {
    app.listen(8100);
  })
  .catch(err => console.log(err));