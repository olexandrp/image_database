const https = require('follow-redirects').https;
const urlParser = require('url');
const fs = require('fs');

const randomImageURL = 'https://source.unsplash.com/random';
const result = [];

function get() {
  return new Promise((resolve, reject) => {
    https.get(randomImageURL, (response) => {
      response.on('data', () => {});
      response.on('end', () => {
        const headers = response.headers;
        const responseUrl = response.responseUrl;
        const urlParts = urlParser.parse(responseUrl);
        const fileName = urlParts.pathname.replace('/', '');
        const url = responseUrl;
        const fileSize = headers['content-length'];
        const lastModified = headers['last-modified'];
        if (!result.some(entry => entry.file_name === fileName)) {
          result.push({
            file_name: fileName,
            url: url,
            file_size: parseInt(fileSize, 10),
            last_modified: lastModified
          });
        }
        resolve();
      });
    }).on("error", (error) => {
      const errorMessage = error.message;
      console.log("Error: " + errorMessage);
      reject();
    });
  });
}

const filePath = './src/data_source/images.json';
function exportResult() {
  const data = JSON.stringify(result, null, 2);
  fs.writeFile(filePath, data, (error) => {
    if (error) throw error;
    console.log('The file has been saved!');
  });
}

const delay = 1000;
const imagesNumber = 100;
let iterations = 0;

let timerId = setTimeout(async function tick() {
  if (result.length === imagesNumber) {
    clearTimeout(timerId);
    exportResult();
    return;
  }
  console.log('tick', iterations);
  iterations++;
  await get();
  timerId = setTimeout(tick, delay);
}, delay);
