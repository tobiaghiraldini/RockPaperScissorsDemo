import { GameMove, GameResult } from './game.interfaces';
import { RockPaperScissorsRules } from './game.rules';

export class GameRepository {
  // tslint:disable-next-line:prefer-function-over-method
  public getResult(move1: GameMove, move2: GameMove): GameResult {
    return RockPaperScissorsRules.getResult(move1, move2);
  }

  public isValid(move1: GameMove, move2: GameMove): boolean {
    return RockPaperScissorsRules.isValid(move1, move2);
  }
}
