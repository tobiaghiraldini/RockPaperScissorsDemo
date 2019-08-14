import { NotFoundResult } from '../../shared/errors';
import { GameMove, GameResult } from './game.interfaces';
import { GameRepository } from './game.repository';

export class GameService {
  public constructor(private readonly gameRepository: GameRepository) {}

  public getResult(move1: GameMove, move2: GameMove): Promise<GameResult> {
    return new Promise<GameResult>((resolve: (result: GameResult) => void, reject: (reason: NotFoundResult) => void): void => {
      const result: GameResult = this.gameRepository.getResult(move1, move2);
      resolve(result);
    });
  }

  public isValid(move1: GameMove, move2: GameMove): boolean {
    return this.gameRepository.isValid(move1, move2);
  }
}
