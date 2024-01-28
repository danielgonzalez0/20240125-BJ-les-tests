// Assurez-vous que le chemin est correct
import { Piece } from "./Piece";
import { expect, test, describe, beforeEach } from "vitest";

describe('Given a new piece is created', () => {
 let piece;

  beforeEach(() => {
    piece = new Piece();
  });

  test('getEmoji should return correct emoji based on state', () => {
    piece.state = 'clean';
    expect(piece.getEmoji()).toBe('🧼');

    piece.state = 'clean_by_robot';
    expect(piece.getEmoji()).toBe('🧽');

    piece.state = 'dirty';
    expect(piece.getEmoji()).toBe('💩');
  });

  test('isDirty should return true if state is dirty', () => {
    piece.state = 'dirty';
    expect(piece.isDirty).toBe(true);
  });

  test('isClean should return true if state is clean or clean_by_robot', () => {
    piece.state = 'clean';
    expect(piece.isClean).toBe(true);

    piece.state = 'clean_by_robot';
    expect(piece.isClean).toBe(true);

    piece.state = 'dirty';
    expect(piece.isClean).toBe(false);
  });

  test('clean changes state to clean_by_robot if state was dirty', () => {
    piece.state = 'dirty';
    piece.clean();
    expect(piece.state).toBe('clean_by_robot');

    piece.state = 'clean';  
    piece.clean();  
    expect(piece.state).toBe('clean');
  });
});