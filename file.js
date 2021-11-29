const fs = require("fs");
// Read file
fs.readFile("./Text.txt", "utf-8", (err, data) => {
  console.log(data);
});

const quotes = "Believe in process💯";
const quotes1 = "\nGo with flow 💯";
const quotes2 = "Master the skills👐";

// Write a file
// fs.writeFile("./write1.txt", quotes2, (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   //done!
// });

// Append to a file
fs.appendFile("./write.txt", quotes1, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  //done!
});

// Create file

// function createFiles(quotes) {
//   for (let i = 0; i <= 20; i++) {
//     fs.writeFile(`./backup/file-${i}.html`, quotes, (err) => {
//       console.log("completed");
//     });
//   }
// }
// createFiles(quotes);

function createFiles(quotes, noOfFiles) {
  for (let i = 0; i <= noOfFiles; i++) {
    fs.writeFile(`./backup/file-${i}.html`, quotes, (err) => {
      console.log("completed");
    });
  }
}
const [, , noOfFiles] = process.argv;
createFiles(quotes, noOfFiles);

// Delete file
// fs.unlink("./write.txt", (err) => {
//   console.log("Deleted");
// });

// Read files in folder
// fs.readdir("./Backup", (err, files) => {
//   console.log(files);
// });
