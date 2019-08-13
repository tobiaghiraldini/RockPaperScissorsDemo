import { ApiCallback, ApiContext, ApiEvent, ApiHandler } from '../../shared/api.interfaces';
import { ErrorCode } from '../../shared/error-codes';
import { ErrorResult } from '../../shared/errors';
import { ResponseBuilder } from '../../shared/response-builder';
import { GameMove, GameRequest, GameResult } from './game.interfaces';
import { GameService } from './game.service';

export class GameController {
  public constructor(private readonly gameService: GameService) {
  }

  public getGameResult: ApiHandler = (event: ApiEvent, context: ApiContext, callback: ApiCallback): void => {
    // Must be a post
    if (event.httpMethod !== 'POST') {
      return ResponseBuilder.badRequest(ErrorCode.InvalidMethod, 'Must be called in a post!', callback);
    }
    if (!(event.body)) {
      return ResponseBuilder.badRequest(ErrorCode.InvalidBodyFormat, 'The body must contain two choices as string', callback);
    }
    // Validation

    const gameRequest: GameRequest = JSON.parse(event.body);
    let gamemove1: GameMove;
    let gamemove2: GameMove;
    try {
      const move1: string = gameRequest.move1;
      const move2: string = gameRequest.move2;
      gamemove1 = {
        choice: move1
      };
      gamemove2 = {
        choice: move2
      };
    } catch (e) {
      return ResponseBuilder.badRequest(ErrorCode.InvalidBodyFormat, 'The body must contain proper moves', callback);
    }
    this.gameService.getResult(gamemove1, gamemove2)
      .then((result: GameResult) =>
        ResponseBuilder.ok<GameResult>(result, callback))
      .catch((error: ErrorResult) =>
        ResponseBuilder.badRequest(error.code, error.description, callback));
  }
}
