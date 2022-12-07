import * as fs from 'fs';

const input = fs.readFileSync("input.txt", "utf-8");

console.log("Example 1: ", findMarker("mjqjpqmgbljsphdztnvjfqwrcgsmlb", 4));

console.log("Result 1: ", findMarker(input, 4));
console.log("Result 2: ", findMarker(input, 14));

function findMarker(input: string, packetSize: number) {
  for (let count = 0; count < input.length; count++) {
    let sub = input.substring(count, count + packetSize);
    if (new Set(sub).size == sub.length) {
      return count + packetSize;
    }
  }
  return -1;
}
