import { Chance } from 'chance';
import { instance, mock, reset, when } from 'ts-mockito';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameMove, GameRequest, GameResult } from './game.interfaces';

const chance: Chance.Chance = new Chance();

describe('GameController', () => {
  const gameServiceMock: GameService = mock(GameService);
  let controller: GameController;

  interface RequestData {
    move1: string;
    move2: string;
  }

  interface ResultData {
    move1: string;
    move2: string;
    result: string;
  }
  let testData: RequestData;

  beforeEach(() => {
    reset(gameServiceMock);
    const gameServiceMockInstance: GameService = instance(gameServiceMock);
    controller = new GameController(gameServiceMockInstance);
    testData = {
      move1: chance.pickone(['Rock', 'Paper', 'Scissors']),
      move2: chance.pickone(['Rock', 'Paper', 'Scissors'])
    };
  });

  describe('getResult function', () => {
    it('Should return HTTP 200 OK', async () => {
      when(gameServiceMock.getResult(testData.move1, testData.move2))
        .thenReturn(Promise.resolve<RequestData>(testData));

    })
    it('Should return a game result', async () => {

    });
  });
});
