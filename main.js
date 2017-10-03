'use strict';

const os = require('os');
const fs = require('fs');
const path = require('path');
const got = require('got');
const wp = require('wallpaper');

const wallPaperPath = 'auto-wallpapers';

function go () {
  return Promise
    .all([
      getUnsplash(),
      getLocalPath()
    ])
    .then(values => {
      return download({source: values[0], destination: values[1]})
        .then(setWallpaper)
    }).catch(console.log)
}

module.exports = go;

function getUnsplash () {
  let url = makeUrl(); //1920, 1080);
  return got(url, {json: true})
    .then(response => response.body.urls.raw)
    .catch(err => console.log(err.response.body));
}

function makeUrl (w, h) {
  let url = 'https://api.unsplash.com/photos/random';
  if (w && h) url += '?w=' + w + '&h=' + h;
  else url += '?orientation=landscape';
  url += '&client_id=336b527b2e18d045045820b78062b95c825376311326b2a08f9b93eef7efc07b';
  return url;
}

function getLocalPath () {
  return findNewId()
    .then(id => {
      let newFileName = `IMG_${id}.jpg`;
      let dest = path.join(os.homedir(), wallPaperPath, newFileName);
      return dest;
    });
}

function findNewId () {
  let id = 0;
  return new Promise((resolve, reject) => {
    let dir = path.join(os.homedir(), wallPaperPath);
    fs.readdir(dir, (err, response) => {
      if (err) return reject(err);
      let num;
      response.length && response.forEach(item => {
        num = item.replace(/\D/g, '');
        id = Math.max(id, parseInt(num));
        if (id || id === 0) id++;
      });
      resolve(id);
    });
  });
}

function download (options) {
  return new Promise((resolve, reject) => {
    let file = fs.createWriteStream(options.destination);
    let request = got.stream(options.source).pipe(file);
    request.on('error', (err) => {
      fs.unlink(options.destination);
      reject(err.message);
    });
    file.on('finish', () => {
      file.close();
      resolve(options.destination);
    });
  });
}

function setWallpaper (path) {
  return wp.set(path)
    .then(() => 'Success!')
    .catch(err => err);
}