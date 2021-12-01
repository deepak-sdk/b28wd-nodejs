import { client } from "./index.js";
import {ObjectId} from 'mongodb'


async function updateMovieByID(id, data) {
  return await client
    .db("b28wd")
    .collection("movies")
    .updateOne({ _id: ObjectId(id) }, { $set: data });
}
async function deleteMovieByID(id) {
  return await client.db("b28wd").collection("movies").deleteOne({ _id: ObjectId(id) });
}
async function getMovieByID(id) {
  console.log(id)
  return await client.db("b28wd").collection("movies").findOne({ _id: ObjectId(id) });
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
