import { expect } from 'chai';
import { Chance } from 'chance';
import { instance, mock, reset } from 'ts-mockito';

import { GameMove, GameResult } from './game.interfaces';
import { GameRepository } from './game.repository';
import { GameService } from './game.service';

// tslint:disable no-unsafe-any (Generates false alarm with ts-mockito functions.)

const chance: Chance.Chance = new Chance();

describe('GameService', () => {
  const gameRepositoryMock: GameRepository = mock(GameRepository);
  const gameRepositoryMockInstance: GameRepository = instance(gameRepositoryMock);
  let service: GameService;
  let testMove1: GameMove;
  let testMove2: GameMove;

  beforeEach(() => {
    reset(gameRepositoryMock);
    service = new GameService(gameRepositoryMockInstance);
    testMove1 = {
      choice: chance.pickone(['Rock', 'Paper', 'Scissors']),
      player: chance.name()
    };
    testMove2 = {
      choice: chance.pickone(['Rock', 'Paper', 'Scissors']),
      player: chance.name()
    };
  });

  describe('getResult function', () => {
    it('should resolve with a GameResult output', async () => {
      const result: GameResult = await service.getResult(testMove1, testMove2);
      expect(result.result);
    });
  });
});
