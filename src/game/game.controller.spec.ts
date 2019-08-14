import { expect } from 'chai';
import { Chance } from 'chance';
import { instance, mock, reset, when } from 'ts-mockito';
import { HttpStatusCode } from '../../shared/http-status-codes';
import { callSuccess } from '../../test';
import { ApiResponseParsed } from '../../test/test.interfaces';
import { GameController } from './game.controller';
import { GameMove, GameRequest, GameResult, ValidMoves, ValidResults } from './game.interfaces';
import { GameService } from './game.service';
import { NotFoundResult } from '../../shared/errors';

const chance: Chance.Chance = new Chance();

describe('GameController', () => {
  const gameServiceMock: GameService = mock(GameService);
  let controller: GameController;

  let requestData: GameRequest;
  let resultData: GameResult;
  let gameMove1: GameMove;
  let gameMove2: GameMove;
  requestData = {
    move1: chance.pickone(ValidMoves),
    move2: chance.pickone(ValidMoves)
  };
  resultData = {
    move1: requestData.move1,
    move2: requestData.move2,
    result: chance.pickone(ValidResults)
  };

  beforeEach(() => {
    reset(gameServiceMock);
    const gameServiceMockInstance: GameService = instance(gameServiceMock);
    controller = new GameController(gameServiceMockInstance);
  });

  describe('getResult function', () => {
    it('Should return HTTP 200 OK', async () => {
      gameMove1 = {
        choice: requestData.move1,
      };
      gameMove2 = {
        choice: requestData.move2
      };
      when(gameServiceMock.getResult(gameMove1, gameMove2))
        .thenReturn(Promise.resolve<GameResult>(resultData));
      const response: ApiResponseParsed<GameResult> = await callSuccess<GameResult>(controller.getGameResult);
      expect(response.statusCode).to.equal(HttpStatusCode.Ok);

    });
    it('Should return the proper game result', async () => {
      when(gameServiceMock.getResult(gameMove1, gameMove2))
        .thenReturn(Promise.resolve<GameResult>(resultData));
      const response: ApiResponseParsed<GameResult> = await callSuccess<GameResult>(controller.getGameResult);
      expect(response.parsedBody.move1).to.oneOf(ValidMoves);
      expect(response.parsedBody.move2).to.oneOf(ValidMoves);
      expect(response.parsedBody.result).to.oneOf(ValidResults);
    });
    it('Should return an error with invalid moves', async () => {
      const errorResult: NotFoundResult()
    });
  });
});
