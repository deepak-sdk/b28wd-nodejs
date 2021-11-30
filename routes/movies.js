import express from "express";
import { getMovies, createMovies, getMovieByID, deleteMovieByID, updateMovieByID } from '../helper.js';

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

const router = express.Router();

router.get("/", async (req, res) => {
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

  const filteredMovies = await getMovies(filter);

  console.log(filteredMovies);

  filteredMovies && res.send(filteredMovies);
});

// Create
router.post("/", async (req, res) => {
  const data = req.body;
  console.log(data);
  //  Create movies in mongo - db.movies.insertMany(data)
  const result = await createMovies(data);
  res.send(result);
});

// capturing id using find
router.get("/:id", async (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  // db.movies.findOne({key:value})
  const movie = await getMovieByID(id);
  // const movie = movies.find((mv) => mv.id === id);
  console.log(movie);
  movie ? res.send(movie) : res.status(404).send({ message: "NOT FOUND" });
});

// delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // db.movies.deleteOne({key:value})
  const remainingMovies = await deleteMovieByID(id);

  console.log(remainingMovies);
  remainingMovies.deletedCount > 0
    ? res.send(remainingMovies)
    : res.status(404).send({ message: "NOT FOUND" });
});

// Edit
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  // db.movies.updateOne({key:value},, { $set: data })
  const updatedMovie = await updateMovieByID(id, data);
  const movie = await getMovieByID(id);

  console.log(movie);
  movie ? res.send(movie) : res.status(404).send({ message: "NOT FOUND" });
});

export const moviesRouter = router;
