import {describe, test, expect, vi} from "vitest";
import { Robot } from "./Robot";
import { House } from "./House";
import { Piece } from "./Piece";

describe("Given a house is created", () => {
test('when a piece is dirty, the method nearestDirtyPiece should return the good position of the nearest dirty piece', () => {
  const LAYOUT = [
    [new Piece("clean"), new Piece("clean"), new Piece("dirty")],
    [new Piece("clean"), new Piece("clean"), new Piece("dirty")],
    [new Piece("clean"), new Piece("clean"), new Piece("clean")]
  ]
  const robot = new Robot();
  const house = new House(LAYOUT, robot);

 
  robot.position = [1, 1];
  expect(house.nearestDirtyPiece()).toEqual([1,2]);

  robot.position = [0, 2];
  expect(house.nearestDirtyPiece()).toEqual([0,2]);
});

test('when a piece is dirty, the method isAllClean should return false', () => {
  const LAYOUT = [
    [new Piece("clean"), new Piece("clean"), new Piece("dirty")]
  ]
  const robot = new Robot();
  const house = new House(LAYOUT, robot);

  expect(house.isAllClean()).toEqual(false);  
});

test('when all pieces are clean, the method isAllClean should return true', () => {
  const LAYOUT = [
    [new Piece("clean"), new Piece("clean"), new Piece("clean")]
  ]
  const robot = new Robot();
  const house = new House(LAYOUT, robot);

  expect(house.isAllClean()).toEqual(true);  
});

test ('should method logLayout display correctly the layout of the house', () => {
  const LAYOUT = [
    [new Piece("clean"), new Piece("clean"), new Piece("dirty")],
    [new Piece("clean"), new Piece("clean"), new Piece("dirty")],
    [new Piece("clean"), new Piece("clean"), new Piece("clean")]
  ]
  const robot = new Robot();
  const house = new House(LAYOUT, robot);

  house.logLayout();

console.warn(house.layout);
  expect(console.log).toBeCalledTimes(LAYOUT.length);
  expect(console.log).toHaveBeenNthCalledWith(1, "🤖🧼💩");
  expect(console.log).toHaveBeenNthCalledWith(2, "🧼🧼💩");
  expect(console.log).toHaveBeenNthCalledWith(3, "🧼🧼🧼");
  

});
})