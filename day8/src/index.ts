import * as fs from 'fs';

import { Tree } from './types';

const input = fs.readFileSync("input.txt", "utf-8");

const matrix = input.split("\n").map((line, row, lines) =>
  line.split("").map((size, index, line) => {
    if (row == 0 || row == lines.length - 1) {
      return { height: +size, visible: true, score: 0 } as Tree;
    }
    return {
      height: +size,
      visible: index == 0 || index == line.length - 1,
      score: 0,
    } as Tree;
  })
);
matrix.forEach((trees: Tree[], i: number) => {
  // check row
  checkTreeVisibility(trees);
  checkTreeVisibility([...trees].reverse());
  // check column
  const col = matrix.map((row) => row[i]);
  checkTreeVisibility(col);
  checkTreeVisibility(col.reverse());
});

console.log(
  "Result A: ",
  matrix.flatMap((trees) => trees.filter((t) => t.visible)).length
);

matrix.forEach((trees: Tree[], rowIndex: number) => {
  trees.forEach((tree: Tree, colIndex: number) => {
    matrix[rowIndex][colIndex].score = calcScenicScore(colIndex, rowIndex);
  });
});
console.log(
  "Result B: ",
  Math.max(...matrix.flatMap((trees) => trees.map((tree) => tree.score)))
);

function checkTreeVisibility(row: Tree[]) {
  let treeHeight = row[0].height;
  for (let t = 1; t < row.length - 1; t++) {
    if (row[t].height > treeHeight) {
      row[t].visible = true;
      treeHeight = row[t].height;
    }
  }
}

function calcScenicScore(treeX: number, treeY: number) {
  const rightTrees = matrix[treeY].filter((tree, index) => index > treeX);
  const downTrees = matrix
    .map((trees) => trees[treeX])
    .filter((tree, i) => i > treeY);
  const leftTrees = matrix[treeY].filter((tree, i) => i < treeX).reverse();
  const upTrees = matrix
    .map((row) => row[treeX])
    .filter((tree, index) => index < treeY)
    .reverse();
  return (
    treesInView(treeX, treeY, upTrees) *
    treesInView(treeX, treeY, rightTrees) *
    treesInView(treeX, treeY, downTrees) *
    treesInView(treeX, treeY, leftTrees)
  );
}

function treesInView(treeX: number, treeY: number, trees: Tree[]) {
  const currentTree = matrix[treeY][treeX];
  const blockingTree = trees.findIndex(
    (tree) => tree.height >= currentTree.height
  );
  return blockingTree != -1 ? blockingTree + 1 : trees.length;
}
