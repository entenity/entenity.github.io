const path = require("path");
const fs = require("fs");

const root = path.resolve(__dirname);
const currentPath = path.resolve(__dirname, "./docs/.vuepress/dist");
const docsPath = path.resolve(__dirname, "./docs");
const ignoreFiles = [
  "docs",
  ".gitignore",
  "file_move.js",
  "deploy-gh.sh",
  "package.json",
  "yarn-error.log",
  "yarn.lock",
  "node_modules",
  ".git"
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
      if(path !== root) {
        fs.rmdirSync(path);
      }
  }
}

function deleteDocs(path) {
  let files = [];
  if( fs.existsSync(path) ) {
    files = fs.readdirSync(path);
    files.forEach((file) => {
        let curPath = path + "/" + file;
        if(fs.statSync(curPath).isDirectory()) {
            deleteFolder(curPath);
        } else {
            fs.unlinkSync(curPath);
        }
    });
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

deleteFolder(root);
startMove(currentPath, root, copy);