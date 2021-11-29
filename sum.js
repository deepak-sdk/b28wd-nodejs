// console.log("Hello World 🙂");

function sum(a, b) {
  return a + b;
}
// console.log(sum(7, 90));

// 🤑Global variable = global, process

// console.log(process.argv);

const add = (c, d) => c + d;
// console.log(process.argv);

// const num1 = process.argv[2];
// const num2 = process.argv[3];

const [, , num1, num2] = process.argv;
console.log(add(+num1, +num2));
