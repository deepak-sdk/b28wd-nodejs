import { client } from "./index.js";



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

export {
  updateMovieByID,
  deleteMovieByID,
  getMovieByID,
  getMovies,
  createMovies,
};
