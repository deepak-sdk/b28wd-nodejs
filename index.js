// module wont support require // const express = require("express");

import dotenv from 'dotenv';
import express from "express";
import { MongoClient } from "mongodb";


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

const client = await createConnection();

app.get("/", (req, res) => {
  res.send("Hello World😀😄");
});

// app.get("/movies", (req, res) => {
//   res.send(movies);
// });

// capturing id using filter
// app.get("/movies/:id", (req, res) => {
//   console.log(req.params);
//   const { id } = req.params;
//   const movie = movies.filter((mv) => mv.id === id)[0];
//   res.send(movie);
// });

// app.get("/movies", (req, res) => {
//   // request => query params
//   console.log(req.query);
//   const { year } = req.query;
//   console.log(year);

//   if (year) {
//     const movie = movies.filter((mv) => mv.year === year);
//     res.send(movie);
//   } else {
//     res.send(movies);
//   }
// });

app.get("/movies", async (req, res) => {
  console.log(req.query);
  const filter = req.query;
  console.log(filter);
  if (filter.rating) {
    filter.rating = +filter.rating;
  }
  // db.movies.find({language:"English"})

  // console.log(language, rating);
  // let filteredMovies = movies;

  // if (language) {
  //   filteredMovies = filteredMovies.filter((mv) => mv.language === language);
  // }

  // if (rating) {
  //   filteredMovies = filteredMovies.filter((mv) => mv.rating === +rating);
  // }

  // db.movies.find({})

  const filteredMovies = await getMovies(filter)

  console.log(filteredMovies);

  filteredMovies && res.send(filteredMovies);
});

// Create
app.post("/movies", async (req, res) => {


  const data = req.body;
  console.log(data);
  //  Create movies in mongo - db.movies.insertMany(data)
  const result = await createMovies(data)
  res.send(result);

});

// capturing id using find
app.get("/movies/:id", async (req, res)=> {
  console.log(req.params);
  const { id } = req.params;

  // db.movies.findOne({key:value})
  const movie = await getMovieByID(id)
  // const movie = movies.find((mv) => mv.id === id);
  console.log(movie);
  movie ? res.send(movie) : res.status(404).send({ message: "NOT FOUND" });
});

// delete
app.delete("/movies/:id", async (req, res)=> {
  const { id } = req.params;

  // db.movies.deleteOne({key:value})
  const remainingMovies = await deleteMovieByID(id)

  console.log(remainingMovies);
  remainingMovies.deletedCount > 0
    ? res.send(remainingMovies)
    : res.status(404).send({ message: "NOT FOUND" });
});

// Edit
app.put("/movies/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  // db.movies.updateOne({key:value},, { $set: data })
  const updatedMovie = await updateMovieByID(id, data)
  const movie = await getMovieByID(id)

  console.log(movie);
  movie ? res.send(movie) : res.status(404).send({ message: "NOT FOUND" });

});

app.listen(PORT, () => {
  console.log("App Started", PORT);
});

// Node converts JS object to JSON.Stringify

// nodemon run only on development
// npm install --save-dev nodemon
// "start": "node index.js",
// "dev": "nodemon index.js",
// npm run dev



async function updateMovieByID(id, data) {
  return await client
    .db("b28wd")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });
}


async function deleteMovieByID(id) {
  return await client.db("b28wd").collection("movies").deleteOne({ id: id });
}

async function getMovieByID(id) {
  return await client.db("b28wd").collection("movies").findOne({ id: id });
}

async function getMovies(filter) {
  return await client.db("b28wd").collection("movies").find(filter).toArray(); //  cursor to array
}

async function createMovies(data) {
  return await client.db("b28wd").collection("movies").insertMany(data);
}
