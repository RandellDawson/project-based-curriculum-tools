const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const numWithLeadingZeros = (originalNum, maxDigits) => {
  let paddedNum = '' + originalNum;
  while (paddedNum.length < maxDigits) {
    paddedNum = '0' + paddedNum;
  }
  return paddedNum;
};

// Only change these variables below this line
const projectPath = 'D:/Coding/fcc/curriculum/challenges/english/01-responsive-web-design/basic-html-cat-photo-app/';
const projectMetaPath = 'D:/Coding/fcc/curriculum/challenges/_meta/basic-html-cat-photo-app/meta.json';
// Only change these variables above this line

const filesArr = [];
fs.readdirSync(projectPath).forEach((fileName) => {
  if (path.extname(fileName).toLowerCase() === ".md") {
    filesArr.push(fileName);
  }
});

const maxStepDigits = (filesArr.length + '').length;

const filesToReorder = filesArr.map((fileName, i) => {
  const newStepNum = numWithLeadingZeros(i + 1, maxStepDigits);
  return {
    oldFileName: fileName,
    newFileName: `part-${newStepNum}.md`,
    newStepNum
  };
});

const challengeOrder = [];
const metaData = fs.readFileSync(projectMetaPath);
const parsedData = JSON.parse(metaData);

filesToReorder.forEach(({ oldFileName, newFileName, newStepNum }) => {
  fs.renameSync(`${projectPath}${oldFileName}`,`${projectPath}${newFileName}.tmp`);
  console.log('rename ' + oldFileName + ' to ' +  newFileName + '.tmp');
  const filePath = `${projectPath}${newFileName}.tmp`;
  const frontMatter = matter.read(filePath);
  const challengeID = frontMatter.data.id;
  challengeOrder.push(['' + challengeID, `Part ${newStepNum}`]);
  const newData = { ...frontMatter.data, title: `Part ${newStepNum}` };
  fs.writeFileSync(filePath, frontMatter.stringify(newData));
  console.log('rewrite frontmatter for ' + newFileName + '.tmp');
});

filesToReorder.forEach(({ oldFileName, newFileName, newStepNum }) => {
  fs.renameSync(`${projectPath}${newFileName}.tmp`,`${projectPath}${newFileName}`);
  console.log("rename " + newFileName + '.tmp' + " to " + newFileName);
});

const newMeta = { ...parsedData, challengeOrder };
fs.writeFileSync(projectMetaPath, JSON.stringify(newMeta, null, 2));