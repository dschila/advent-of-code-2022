const fs = require("fs");

console.log("Result 1: " + getMatches(loadInput()));
console.log("Result 2: " + getOverlaps(loadInput()));

function loadInput() {
  return fs
    .readFileSync("input.txt")
    .toString()
    .matchAll(/(\d+)-(\d+),(\d+)-(\d+)/g);
}

function getMatches(input) {
  let matches = 0;
  for (const [, startA, endA, startB, endB] of input) {
    if (+startA <= +startB && +endA >= +endB) {
      matches += 1;
      continue;
    }
    if (+startB <= +startA && +endB >= +endA) {
      matches += 1;
      continue;
    }
  }
  return matches;
}

function getOverlaps(input) {
  let overlaps = 0;
  for (const [, startA, endA, startB, endB] of input) {
    if (+startA <= +endB && +startB <= +endA) {
      overlaps += 1;
    }
  }
  return overlaps;
}
