import { InvalidGameResult } from '../../shared/errors';
import { GameMove, GameResult } from './game.interfaces';
import { GameRepository } from './game.repository';

export class GameService {
  public constructor(private readonly gameRepository: GameRepository) {}

  public getResult(move1: GameMove, move2: GameMove): Promise<GameResult> {
    return new Promise((resolve: (result: GameResult) => void, reject: (reason: InvalidGameResult) => void): void => {
      // if (!this.gameRepository.isValid(move1, move2)) {
      //   reject(new InvalidGameResult('INVALID_CONTENT', 'Allowed moves are rock, paper, scissors'));
      //   return;
      // }
      const result: GameResult = this.gameRepository.getResult(move1, move2);
      resolve(result);
    });
  }

  public isValid(move1: GameMove, move2: GameMove): boolean {
    return this.gameRepository.isValid(move1, move2);
  }
}
