

import { House } from "./House.js";
import { Piece } from "./Piece.js";
import { Robot, createLayout } from "./Robot.js";
import { describe, test, expect, vi } from "vitest";

describe("Given a new robot is created", () => {
  test('check battery should return 0 log and actual position if baterry > 0', () => {
    const robot = new Robot();
    robot.position = [22, 22];
    robot.checkBattery();
    expect(console.log).toBeCalledTimes(0);
  });

  test('check battery should return 2 logs and position = [0,0] if baterry <= 0', () => {
    const robot = new Robot();
    robot.position = [22, 22];
    robot.battery = 0;
    robot.checkBattery();
    expect(console.log).toBeCalledTimes(2);
    expect(robot.position).toEqual([0, 0]);
    expect(robot.battery).toEqual(100);
  });
})

describe("Given a robot is moving", () => {
  const robot = new Robot();
  robot.position = [22, 22];
  robot.battery = 100;

  test('when abscisse are > 1, battery and position do not change', () => {
    robot.move(2, 1);
    expect(robot.position).toEqual([22, 22]);
    expect(robot.battery).toEqual(100);
    expect(console.log).toBeCalledTimes(1);
  });
  test('when ordinate are > 1, battery and position do not change', () => {
    robot.move(1, 10);
    expect(robot.position).toEqual([22, 22]);
    expect(robot.battery).toEqual(100);
    expect(console.log).toBeCalledTimes(1);
  });
  test('when x and y are equal to 1, battery and position change', () => {
    robot.move(1, 1);
    expect(robot.position).toEqual([23, 23]);
    expect(robot.battery).toEqual(99);
    expect(console.log).toBeCalledTimes(1);
  });
});

describe("Given a robot is logging battery", () => {
  test('when battery is 100%, log should be 10 green squares', () => {
    const robot = new Robot();
    robot.logBattery();
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith('🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩');
  });
  test('when battery is 50%, log should be 5 green squares and 5 red squares', () => {
    const robot = new Robot();
    robot.battery = 50;
    robot.logBattery();
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith('🟩🟩🟩🟩🟩🟥🟥🟥🟥🟥');
  });

  test('when battery is 0%, log should be 10 red squares', () => {
    const robot = new Robot();
    robot.battery = 0;
    robot.logBattery();
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith('🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥');
  });


  describe("Given a robot is cleaning", () => {
    test('when cleaning, battery decrease by 5', () => {
      const robot = new Robot();
      const house = new House(createLayout([5, 5]), robot);
      robot.battery = 100;
      robot.position = [2, 2];
      house.clean = vi.fn();
      robot.clean(house);
      expect(robot.battery).toEqual(95);
      expect(house.clean).toBeCalledTimes(1);
    });
  });

  describe("Given a robot is cleaing", () => {
    test('should method doWork works correctly', () => {
      const LAYOUT = [
        [new Piece("clean"), new Piece("clean"), new Piece("dirty")],
        [new Piece("clean"), new Piece("clean"), new Piece("clean")], 
        [new Piece("clean"), new Piece("clean"), new Piece("clean")]
      ]
      const robot = new Robot();
      const house = new House(LAYOUT, robot);

      robot.move = vi.fn()
      robot.clean = vi.fn()

      robot.position = [1, 1];
      robot.doWork(house);

      expect(robot.move).toBeCalledTimes(1);
      expect(robot.move).toBeCalledWith(-1, 0);

    vi.mocked(robot.move).mockReset();
    robot.position = [0, 2];
    robot.doWork(house);

    expect(robot.move).toBeCalledTimes(0);
    expect(robot.clean).toBeCalledTimes(1);

      vi.mocked(robot.move).mockReset();
      vi.mocked(robot.clean).mockReset();
     
      LAYOUT[0][2].state = "clean";
      robot.doWork(house);
      expect(console.log).toBeCalledTimes(1);
      expect(console.log).toBeCalledWith('🤖 a terminé le nettoyage.');
      expect(robot.move).toBeCalledTimes(0);
      expect(robot.clean).toBeCalledTimes(0);
    });
  });

});

