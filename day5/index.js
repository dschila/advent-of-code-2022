const fs = require("fs");

const [instructionsA, stacksA] = getRawInformations();

console.log("Result 1:", getStackTops(moveOneByOne(instructionsA, stacksA)));

const [instructionsB, stacksB] = getRawInformations();

console.log(
  "Result 2:",
  getStackTops(moveWithCrateMover9001(instructionsB, stacksB))
);

function getRawInformations() {
  const [rawStacks, rawInstructions] = loadInput("input.txt");
  console.log("#############");
  const stacks = extractStacks(rawStacks);
  const instructions = extractInstructions(rawInstructions);
  console.log("Stacks:");
  console.log(stacks);
  console.log("Instructions: [Column, From, To]");
  console.log(instructions);
  return [instructions, stacks];
}

function loadInput(filename) {
  return fs.readFileSync(filename).toString().trimEnd().split("\n\n");
}

function extractInstructions(rawInstructions) {
  return rawInstructions
    .split("\n")
    .map((field) => field.split(" "))
    .map(([, index, , from, , to]) =>
      [index, from, to].map((row) => parseInt(row))
    );
}

function extractStacks(rawStacks) {
  return rawStacks
    .split("\n")
    .slice(0, -1)
    .reduce((acc, current) => {
      for (let r = 0; r < current.length; r++) {
        let index = r + 1;
        acc[index] = acc[index] || [];
        let cont = current.slice(r * 4, (r + 1) * 4).trim();
        if (cont) {
          acc[index].unshift(cont.slice(1, 2));
        }
      }
      return acc;
    }, {});
}

function moveOneByOne(instructions, stacks) {
  const rearranged = stacks;
  instructions.forEach(([column, start, end]) => {
    for (let i = 0; i < column; i++) {
      rearranged[end].push(rearranged[start].pop());
    }
  });
  return rearranged;
}

function moveWithCrateMover9001(instructions, stacks) {
  const rearranged = { ...stacks };
  instructions.forEach(([column, start, end]) => {
    rearranged[end].push(...rearranged[start].splice(-column, column));
  });
  return rearranged;
}

function getStackTops(stacks) {
  return Object.keys(stacks)
    .reduce((acc, row) => (acc.push(stacks[row].slice(-1)), acc), [])
    .join("")
    .trim();
}
