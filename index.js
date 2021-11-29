const express = require("express");
const app = express();

const PORT = 7000;
const movies = [
  {
    id: "101",
    name: "Raging Bull",
    pic: "https://th.bing.com/th/id/R.2436835c74b8017745b04a020d0174e6?rik=NU9IGHDvYIYi0w&riu=http%3a%2f%2fwww.cultjer.com%2fimg%2fug_photo%2f2014_01%2ftumblr_mdnxv8jJ201qm7fcfo6_12820140127170303.jpg&ehk=sAn2RgGdPJaMi9zoX5c1ikWGxuIeY%2fSp6fP0zsh%2ftq0%3d&risl=&pid=ImgRaw&r=0",
    summary:
      "A fighter noted less for his technique than his ability to inflict physical punishment on his opponents, La Motta was once banned from the sport for throwing a fight.",
    rating: 10,
    year: "1980",
    language: "English",
    trailer: "https://www.youtube.com/embed/yUp6d79WRVI",
  },
  {
    id: "102",
    name: "The Irishman",
    pic: "https://th.bing.com/th/id/R.4ec60047951c34d4979373db84d6601f?rik=YQ%2fJFcGVDS0R8Q&riu=http%3a%2f%2fprodimage.images-bn.com%2fpimages%2f0715515253215_p0_v1_s1200x630.jpg&ehk=%2b0r0uJPvNVfz5QFhBpjW1yGwduoelrLGy5Zwe0lmR%2fs%3d&risl=&pid=ImgRaw&r=0",
    summary:
      "The Irishman is an epic saga of organized crime in post-war America told through the eyes of World War II veteran Frank Sheeran.",
    rating: 7.8,
    year: "2019",
    language: "English",
    trailer: "https://www.youtube.com/embed/WHXxVmeGQUc",
  },
  {
    id: "105",
    name: "Shutter Island",
    pic: "https://i.pinimg.com/originals/a6/5e/51/a65e51e99c84df7fa20d5fa5e872058d.jpg",
    summary:
      "When a patient at an isolated asylum disappears from a locked room, US Marshall Edward Teddy Daniels investigates but discovers that Shutter Island has a sinister secret.",
    rating: 10,
    year: "2010",
    language: "English",
    trailer: "https://www.youtube.com/embed/5iaYLCiq5RM",
  },
];

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

// capturing id using find
app.get("/movies/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const movie = movies.find((mv) => mv.id === id);
  console.log(movie);
  movie ? res.send(movie) : res.send({ message: "NOT FOUND" });
});

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

app.get("/movies", (req, res) => {
  // request => query params
  console.log(req.query);
  const { language, rating } = req.query;
  console.log(language, rating);
  let movie = movies;

  if (language) {
    movie = movie.filter((mv) => mv.language === language);
  }

  if (rating) {
    movie = movie.filter((mv) => mv.rating === +rating);
  }

  res.send(movie);
});

// Node converts JS object to JSON.Stringify

app.listen(PORT, () => {
  console.log("App Started", PORT);
});

// nodemon run only on development
// npm install --save-dev nodemon
// "start": "node index.js",
// "dev": "nodemon index.js",
// npm run dev
