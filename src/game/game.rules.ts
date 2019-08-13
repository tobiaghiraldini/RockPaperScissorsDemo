import { GameMove, GameResult, GameResults } from './game.interfaces';

export class RockPaperScissorsRules {

  public static getResult(move1: GameMove, move2: GameMove): GameResult {
    return RockPaperScissorsRules.applyRules(move1, move2);
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

    if (move1 === move2) {
      return {
        ...baseResult,
        result: GameResults.draw
      };
    }
    switch (move1.choice) {
      case 'Paper':
        if (move2.choice === 'Rock') {
          return {
            ...baseResult,
            result: GameResults.win
          };
        }
        return {
          ...baseResult,
          result: GameResults.loss
        };
      case 'Rock':
        if (move2.choice === 'Paper') {
          return {
            ...baseResult,
            result: GameResults.loss
          };
        }
        return {
          ...baseResult,
          result: GameResults.win
        };
      case 'Scissors':
        if (move2.choice === 'Rock') {
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
          result: ''
        };
    }
  }
}
