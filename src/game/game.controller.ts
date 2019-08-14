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
    let move1: string;
    let move2: string;
    try {
      const gameRequest: GameRequest = JSON.parse(event.body);
      move1 = gameRequest.move1.toLowerCase();
      move2 = gameRequest.move2.toLowerCase();
    } catch (e) {
      return ResponseBuilder.badRequest(ErrorCode.InvalidBodyFormat, 'The body must contain proper moves', callback);
    }

    let gamemove1: GameMove;
    let gamemove2: GameMove;
    gamemove1 = {
      choice: move1
    };
    gamemove2 = {
      choice: move2
    };
    if (!this.gameService.isValid(gamemove1, gamemove2)) {
      return ResponseBuilder.badRequest(ErrorCode.InvalidBodyContent, 'Allowed moves are rock, paper, scissors', callback);
    }
    this.gameService.getResult(gamemove1, gamemove2)
      .then((result: GameResult) => {
        return ResponseBuilder.ok<GameResult>(result, callback);
      })
      .catch((error: ErrorResult) => {
        return ResponseBuilder.badRequest(error.code, error.description, callback);
    });
  }
}
