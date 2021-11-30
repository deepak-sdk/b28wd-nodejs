console.log('hello')

const [, , value] = process.argv;
console.log("Input :", value);
const arr = JSON.parse(value);
console.log("Converted to array :", arr);
let max=0;
for (let i = 0; i < arr.length; i++){
    if (max < arr[i]) {
       max = arr[i] 
    }
}
console.log("Max number :", max)

console.log("Min number :", Math.min(...arr));