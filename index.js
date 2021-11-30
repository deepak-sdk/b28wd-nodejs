// module wont support require // const express = require("express");

import dotenv from 'dotenv';
import express from "express";
import { MongoClient } from "mongodb";
import { getMovies, createMovies, getMovieByID, deleteMovieByID, updateMovieByID } from './helper.js';
import { moviesRouter } from './routes/movies.js';


dotenv.config() // all keys stored in process.env

const app = express();

const PORT = 9000;

// middleware
app.use(express.json()); //every request in app convert into json
// express.json() - inbuild middleware

// MongoDB Connection
const MONGO_URL = process.env.MONGO_URL;


async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect(); //promise
  console.log("MongoDB Connected");
  return client;
}

export const client = await createConnection();

app.get("/", (req, res) => {
  res.send("Hello World😀😄");
});

app.use("/movies", moviesRouter)

app.listen(PORT, () => {
  console.log("App Started", PORT);
});


// nodemon run only on development
// npm install --save-dev nodemon
// "start": "node index.js",
// "dev": "nodemon index.js",
// npm run dev