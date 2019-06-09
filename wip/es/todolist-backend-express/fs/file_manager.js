/**
 * Module to get file content and make an object
 * to test it in the file:
 *
 * const file = path.join(__dirname, 'test.json');
 * getObjectFromFile(file).then((res) => console.log(res));
 */
import 'babel-polyfill';

const fs = require('fs');

function getFileContent(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function getObjectFromFile(filePath) {
  return JSON.parse(await getFileContent(filePath));
}

async function writeObjectInFile(jsonObject, filePath) {
  const data = JSON.stringify(jsonObject, null, 2);
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export { getObjectFromFile, writeObjectInFile };
