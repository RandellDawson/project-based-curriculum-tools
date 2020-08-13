const fs = require("fs");

const numWithLeadingZeros = (originalNum, maxDigits) => {
  let paddedNum = "" + originalNum;
  while (paddedNum.length < maxDigits) {
    paddedNum = "0" + paddedNum;
  }
  return paddedNum;
};

/*
function below modifed from GitHub user @solenoid's gist https://gist.github.com/solenoid/1372386
*/
const mongoObjectId = () => {
  var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};

const createStepFile = ({ projectPath, stepNum }) => {

const template = `---
id: ${mongoObjectId()}
title: Part ${numWithLeadingZeros(stepNum, 2)}
challengeType: 0
isHidden: true
---

## Description
<section id='description'>

step ${stepNum} instructions

</section>

## Tests
<section id='tests'>

\`\`\`yml
tests:
  - text: Test 1
    testString: ''

\`\`\`

</section>

## Challenge Seed
<section id='challengeSeed'>



</section>
`;

  fs.writeFileSync(
    `${projectPath}part-${numWithLeadingZeros(stepNum, 2)}.md`,
    template
  );


};

module.exports = {
  numWithLeadingZeros,
  mongoObjectId,
  createStepFile
};