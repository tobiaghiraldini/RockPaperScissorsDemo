import { ApiHandler } from '../../shared/api.interfaces';
import { GameController } from './game.controller';
import { GameRepository } from './game.repository';
import { GameService } from './game.service';

const repo: GameRepository = new GameRepository();
const service: GameService = new GameService(repo);
const controller: GameController = new GameController(service);

export const getGameResult: ApiHandler = controller.getGameResult;
