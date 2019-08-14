import { GameItems, GameMove, GameResult, GameResults, ValidMoves } from './game.interfaces';

export class RockPaperScissorsRules {

  public static getResult(move1: GameMove, move2: GameMove): GameResult {
    return RockPaperScissorsRules.applyRules(move1, move2);
  }

  public static isValid(move1: GameMove, move2: GameMove): boolean {
    return ValidMoves.indexOf(move1.choice) >= 0  && ValidMoves.indexOf(move2.choice) >= 0;
  }

  private static applyRules(move1: GameMove, move2: GameMove): GameResult {
    /**
     * Most readable version, naive implementation
     * Optimized implementation could be calculating the distance between the moves
     * move1.value - move2.value +3 % 3 === 1 (first move wins)
     */
    const baseResult: GameResult = {
      move1: move1.choice,
      move2: move2.choice,
      result: ''
    };

    if (move1.choice === move2.choice) {
      return {
        ...baseResult,
        result: GameResults.draw
      };
    }
    switch (move1.choice) {
      case GameItems.paper:
        if (move2.choice === GameItems.rock) {
          return {
            ...baseResult,
            result: GameResults.win
          };
        }
        return {
          ...baseResult,
          result: GameResults.loss
        };
      case GameItems.rock:
        if (move2.choice === GameItems.paper) {
          return {
            ...baseResult,
            result: GameResults.loss
          };
        }
        return {
          ...baseResult,
          result: GameResults.win
        };
      case GameItems.scissors:
        if (move2.choice === GameItems.rock) {
          return {
            ...baseResult,
            result: GameResults.loss
          };
        }
        return {
          ...baseResult,
          result: GameResults.win
        };
      default:
        return {
          ...baseResult,
          result: 'INVALID_CONTENT'
        };
    }
  }
}
