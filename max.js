// let arrayOfNumbers = [12, 45];
// let max = Math.max(...arrayOfNumbers);
// console.log(max);

// const maxi = () => {
//   let arrayOfNumbers = [];
//   let max = Math.max(...arrayOfNumbers);
//   // console.log(process.argv);

//   const [, , ...arrayOfNumbers] = process.argv;
//   return max;
// };

// console.log(maxi);

const [, , nums] = process.argv;
console.log("Input :", nums);
const arr = JSON.parse(nums);
console.log("Converted to array :", arr);
console.log("Max number :", Math.max(...arr));
