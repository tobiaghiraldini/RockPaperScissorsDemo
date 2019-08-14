import { expect } from 'chai';
import { Chance } from 'chance';
import { instance, mock, reset, when } from 'ts-mockito';
import { HttpStatusCode } from '../../shared/http-status-codes';
import { callSuccess, postSuccess } from '../../test';
import { ApiResponseParsed } from '../../test/test.interfaces';
import { GameController } from './game.controller';
import { GameItems, GameMove, GameRequest, GameResult, ValidMoves, ValidResults } from './game.interfaces';
import { GameService } from './game.service';

const chance: Chance.Chance = new Chance();

describe('GameController', () => {
  const gameServiceMock: GameService = mock(GameService);
  let controller: GameController;

  let requestData: GameRequest;
  let resultData: GameResult;
  let gameMove1: GameMove;
  let gameMove2: GameMove;

  beforeEach(() => {
    reset(gameServiceMock);
    const gameServiceMockInstance: GameService = instance(gameServiceMock);
    controller = new GameController(gameServiceMockInstance);
    requestData = {
      move1: GameItems.paper,
      move2: GameItems.rock
    };
    resultData = {
      move1: requestData.move1,
      move2: requestData.move2,
      result: chance.pickone(ValidResults)
    };
    gameMove1 = {
      choice: requestData.move1,
    };
    gameMove2 = {
      choice: requestData.move2
    };
  });

  describe('getResult function', () => {
    it('Should return HTTP 400 for GET', async () => {
      when(gameServiceMock.isValid(gameMove1, gameMove2)).thenReturn(true);
      when(gameServiceMock.getResult(gameMove1, gameMove2))
        .thenResolve((resultData));
      const response: ApiResponseParsed<GameResult> = await callSuccess<GameResult>(controller.getGameResult);
      expect(response.statusCode).to.equal(HttpStatusCode.BadRequest);

    });
    it('Should return the proper game result', async () => {
      when(gameServiceMock.isValid(gameMove1, gameMove2)).thenReturn(true);
      when(gameServiceMock.getResult(gameMove1, gameMove2))
        .thenResolve(resultData);
      const response: ApiResponseParsed<GameResult> = await postSuccess<GameResult>(controller.getGameResult, JSON.stringify(requestData));
      console.log("response")
      console.log(response)
      expect(response.parsedBody.move1).to.oneOf(ValidMoves);
      expect(response.parsedBody.move2).to.oneOf(ValidMoves);
      expect(response.parsedBody.result).to.oneOf(ValidResults);
    });
    // TODO
    // it('Should return an error with invalid moves', async () => {
    //   const errorResult: NotFoundResult()
    // });
  });
});
