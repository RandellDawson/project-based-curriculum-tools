const { numWithLeadingZeros, createStepFile } = require("./utils");

// Only change these variables below this line
const projectPath =
  "D:/Coding/fcc/curriculum/challenges/english/01-responsive-web-design/basic-css-cafe-menu/";
// Only change these variables above this line

const commandLineArgs = process.argv;
const [ first, second, ...argValuePairs] = commandLineArgs;

const args = argValuePairs.reduce((argsObj, arg) => {
  const [argument, value] = arg.replace(/\s/g, '').split('=');
  if (!argument || !value) {
    console.log(`Invalid argument/value specified: ${arg}`);
    process.exit();
  }
  return { ...argsObj, [argument]: value };
}, {});

let { num, start } = args;
num = parseInt(num);
stepStart = parseInt(start);

if (num > 20) {
  console.log('No steps created. Specify a value less than or equal to 20 for num argument.');
  process.exit();
}

const maxStepNum = stepStart + num - 1;

for (let stepNum = stepStart; stepNum <= maxStepNum; stepNum++) {
  createStepFile({ stepNum, projectPath });
}
console.log(`Sucessfully added ${num} steps`);
