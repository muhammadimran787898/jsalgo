// const arr = [1, 2, 3, 4, 3, 4, 4, 4, 5];

// let data = new Set(arr);

// let tt=[]

// arr.map((i) => {
//     if (!tt.includes(i)){
//         tt.push(i);
//     }

// })

// let d = {}

// arr.map((i) => {
//     d[i] = (data[i] || 0) + 1
// }
// )

// // console.log(d,"gg")

// let dataa = arr.reduce((a, b) => {
//     a[b] = (a[b] || 0) + 1
//     return a
// }, {})

// // console.log(dataa,"data")

// const array = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];

// const countOccurrences = array.reduce((acc, currentValue) => {
//   acc[currentValue] = (acc[currentValue] || 0) + 1;
//   return acc;
// }, {});

// console.log(countOccurrences);

// // const obj = {
// //     key1: 'value1', key2: 'value2', key3: 'value3', key4: {
// //         key5: 6, key7: 9, key8: {
// //     ke10:12
// // }} };

// // const objmap = Object.keys(obj).flatmap(key => ({ key, value: obj[key] }))
// // console.log(objmap,"ll");
const { createCanvas } = require("canvas");
const { drawContributions } = require("github-contributions-canvas");
const fs = require("fs");
const { format, differenceInDays, addDays } = require("date-fns");

// Generate exactly 350 contributions for the specified date range
const generateContributions = (startDate, endDate, totalContributions) => {
  const contributions = {};
  const totalDays = differenceInDays(endDate, startDate) + 1;

  // Initialize contributions with 0
  let currentDate = startDate;
  for (let i = 0; i < totalDays; i++) {
    const dateString = format(currentDate, "yyyy-MM-dd");
    contributions[dateString] = 0;
    currentDate = addDays(currentDate, 1);
  }

  // Randomly distribute 350 contributions
  let contributionsLeft = totalContributions;
  while (contributionsLeft > 0) {
    const randomDayIndex = Math.floor(Math.random() * totalDays);
    const dateString = format(addDays(startDate, randomDayIndex), "yyyy-MM-dd");
    contributions[dateString]++;
    contributionsLeft--;
  }

  return contributions;
};

// Define the date range
const startDate = new Date("2022-01-01");
const endDate = new Date("2022-08-18");

// Generate the contributions
const totalContributions = 350;
const contributions = generateContributions(
  startDate,
  endDate,
  totalContributions
);

// Create a canvas
const canvas = createCanvas(800, 200);

// Draw the contributions on the canvas
drawContributions(canvas, {
  data: contributions,
  username: "imran787898",
  themeName: "standard",
})
  .then(() => {
    // Save the canvas as an image
    const out = fs.createWriteStream("./contributions.png");
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () =>
      console.log("The contribution graph image was created.")
    );
  })
  .catch((err) => {
    console.error("Error drawing contributions:", err);
  });
