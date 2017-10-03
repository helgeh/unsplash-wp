'use strict';

const os = require('os');
const fs = require('fs');
const path = require('path');
const got = require('got');
const wp = require('wallpaper');

const defaultOptions = {
  unsplashStore: path.join(os.tmpdir(), 'unsplash-wp-store')
};

function unsplashWp (options) {
  options = Object.assign({}, defaultOptions, options);
  return ensureLocalFolder(options.unsplashStore).then(() => {
    return Promise.all([
      getUnsplash(),
      getNewFilename(options.unsplashStore)
    ]).then(values => {
      return download({source: values[0], destination: values[1]})
        .then(setWallpaper)
    }).catch(console.log); // TODO: Remove this console log. Let the consumer handle errors!
  });
}

module.exports = unsplashWp;

function ensureLocalFolder (path) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, err => {
      if (err) {
        if (err.code === 'EEXIST') resolve(null);
        else reject(err);
      }
      else resolve(null);
    });
  });
}

function getUnsplash () {
  let url = makeUrl(); //1920, 1080);
  return got(url, {json: true})
    .then(response => response.body.urls.raw)
    .catch(err => console.log(err.response.body)); // TODO: Remove this console log. Let the consumer handle errors!
}

function makeUrl (w, h) {
  let url = 'https://api.unsplash.com/photos/random';
  if (w && h) url += '?w=' + w + '&h=' + h;
  else url += '?orientation=landscape';
  url += '&client_id=336b527b2e18d045045820b78062b95c825376311326b2a08f9b93eef7efc07b';
  return url;
}

function getNewFilename (localPath) {
  return findNewId(localPath)
    .then(id => {
      let newFileName = `IMG_${id}.jpg`;
      let dest = path.join(localPath, newFileName);
      return dest;
    });
}

function findNewId (localPath) {
  let id = 0;
  return new Promise((resolve, reject) => {
    fs.readdir(localPath, (err, response) => {
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