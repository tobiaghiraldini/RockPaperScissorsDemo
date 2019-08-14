// tslint:disable-next-line:typedef variable-name
export const GameItems = {
  paper: 'paper',
  rock: 'rock',
  scissors: 'scissors'
};

// tslint:disable-next-line:variable-name
export const ValidMoves: string[] = [
  GameItems.paper, GameItems.rock, GameItems.scissors
];

// tslint:disable-next-line:typedef variable-name
export const GameResults = {
  draw: 'draw',
  loss: 'loss',
  win: 'win'
};

export interface GameMove {
  choice: string;
}

export interface GameRequest {
  move1: string;
  move2: string;
}

export interface GameResult {
  move1: string;
  move2: string;
  result: string;
}
