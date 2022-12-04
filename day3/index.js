const fs = require("fs");

var rucksacks = fs.readFileSync("input.txt").toString();

const partA = rucksacks
  .split("\n")
  .map(getCompartments)
  .map((compartments) => getType(compartments[0], compartments[1])[0])
  .map((type) => getPriorityByItem(type))
  .reduce((acc, character) => acc + character, 0);

const partB = rucksacks
  .match(/\w+\n\w+\n\w+/g)
  .map((group) => group.match(/(?<type>\w).*\n.*\k<type>.*\n.*\k<type>/))
  .map((match) => match.groups["type"])
  .map((badged) => getPriorityByItem(badged))
  .reduce((acc, character) => acc + character, 0);

console.log("Part 1: " + partA);
console.log("Part 2: " + partB);

function getType(first, second) {
  return [...first].filter((type) => second.includes(type));
}

function getCompartments(rucksack) {
  return [
    rucksack.substring(0, rucksack.length / 2),
    rucksack.substring(rucksack.length / 2, rucksack.length),
  ];
}

function getPriorityByItem(item) {
  return item.toUpperCase() === item && item !== item.toLowerCase()
    ? item.charCodeAt() - 38
    : item.charCodeAt() - 96;
}
