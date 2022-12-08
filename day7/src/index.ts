import * as fs from 'fs';

import { Directory, File } from './types';

var overallSize = 0;

const filesystem = fs.readFileSync("input.txt", "utf-8").trimEnd().split("\n");

let root: Directory = {
  type: "DIRECTORY",
  name: "/",
  children: [],
};
let currentDir: string = "/";
let path: string[] = ["/"];

filesystem.forEach((line) => {
  if (line.startsWith("$")) {
    executeCommand(line);
    return;
  }
  if (line.startsWith("dir")) {
    addDirectory(line);
    return;
  }
  addFile(line);
});

calculateOverallSize(root);
console.log("Result 1:", overallSize);

const sizes: number[] = [];
const totalSize = calculateTotalSize(root, sizes);
const diskUnused = 70000000 - totalSize;
const diskMinDirSize = 30000000 - diskUnused;
console.log("Result 2:", Math.min(...sizes.filter((s) => s > diskMinDirSize)));

function executeCommand(command: string) {
  let params = command.split(" ");
  switch (params[1]) {
    case "cd":
      if (params[2] == "/") {
        path = [];
        currentDir = "/";
        break;
      }
      if (params[2] == "..") {
        path.pop();
        currentDir = path.length > 0 ? path[path.length - 1] : "/";
        break;
      }
      path.push(params[2]);
      currentDir = params[2];
      break;
    default:
      break;
  }
}

function addFile(file: string) {
  let f = file.split(" ");
  getDirectoryByPath().children.push({
    type: "FILE",
    name: f[1],
    size: +f[0],
  } as File);
}

function addDirectory(dir: string) {
  let name = dir.replace("dir", "");
  getDirectoryByPath().children.push({
    type: "DIRECTORY",
    name: name.trimStart(),
    children: [],
    size: 0,
  } as Directory);
}

function getDirectoryByPath(): Directory {
  if (currentDir == "/") {
    return root;
  }
  if (path.length == 1) {
    return root.children.filter((dir) => dir.name == path[0])[0] as Directory;
  }
  let dir: Directory = root;
  path.forEach((path) => {
    dir = getNextDir(dir, path);
  });
  return dir;
}

function getNextDir(dir: Directory, name: string) {
  return dir.children.filter((dir) => dir.name == name)[0] as Directory;
}

function calculateOverallSize(dir: Directory) {
  let size = 0;

  dir.children.forEach((item) => {
    if (item.type == "FILE") {
      size += item.size;
    } else {
      size += calculateOverallSize(item);
    }
  });

  if (size < 100000) {
    overallSize += size;
  }

  return size;
}

function calculateTotalSize(dir: Directory, sizes: number[]) {
  let size = 0;
  dir.children.forEach((item) => {
    if (item.type == "FILE") {
      size += item.size;
    } else {
      size += calculateTotalSize(item, sizes);
    }
  });

  sizes.push(size);
  return size;
}
