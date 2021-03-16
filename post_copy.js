const path = require("path");
const fs = require("fs");

const target_folder = path.resolve(__dirname, './docs/category');
const source_folder = path.resolve(__dirname, "./docs/archive");
const ignoreFiles = [
  "README.md",
];

function deleteFolder(path) {
  let files = [];
  if( fs.existsSync(path) ) {
      files = fs.readdirSync(path);
      files = files.filter((it) => {
        return !ignoreFiles.some((_it) => {
          return _it === it
        })
      })
      files.forEach((file) => {
          let curPath = path + "/" + file;
          if(fs.statSync(curPath).isDirectory()) {
              deleteFolder(curPath);
          } else {
              fs.unlinkSync(curPath);
          }
      });
      if(path !== target_folder) {
        fs.rmdirSync(path);
      }
  }
}

function copy(source, target) {
  files = fs.readdirSync(source);
  files.forEach((file) => {
    let childSource = path.join(source, file)
    let childTarget = path.join(target, file)
    let readable
    let writable
    if(fs.statSync(childSource).isDirectory()) {
      startMove(childSource, childTarget, copy);
    } else {
      readable = fs.createReadStream(childSource);
      writable = fs.createWriteStream(childTarget);
      readable.pipe(writable);
    }
  });
};

function startMove(source, target, callback) {
    if (fs.existsSync(target)) {
      callback(source, target);
    }
    else {
      fs.mkdir(target, () => {
        callback(source, target)
      });
    }
};

deleteFolder(target_folder);
startMove(source_folder, target_folder, copy);