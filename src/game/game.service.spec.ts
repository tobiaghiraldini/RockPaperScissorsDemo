import { expect } from 'chai';
import { Chance } from 'chance';
import { instance, mock, reset, when } from 'ts-mockito';

import { GameItems, GameMove, GameResult, GameResults, ValidMoves } from './game.interfaces';
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
      choice: chance.pickone(ValidMoves),
    };
    testMove2 = {
      choice: chance.pickone(ValidMoves),
    };
  });

  describe('getResult function', () => {
    it('should resolve with a GameResult output', async () => {
      testMove1 = {
        choice: GameItems.paper,
      };
      testMove2 = {
        choice: GameItems.rock,
      };
      const testResult: GameResult = {
        move1: testMove1.choice,
        move2: testMove2.choice,
        result: GameResults.win
      };
      when(gameRepositoryMock.isValid(testMove1, testMove2)).thenReturn(true);
      when(gameRepositoryMock.getResult(testMove1, testMove2)).thenReturn(testResult);
      const result: GameResult = await service.getResult(testMove1, testMove2);
      expect(result.result);
      expect(result.move1).to.equal(testMove1.choice);
      expect(result.move2).to.equal(testMove2.choice);
    });
  });
});
