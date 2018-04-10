
/**
 * x/y refer to board positions (if the block is active) always measured from
 * the block's top left, even after rotation
 */
export interface Block {
  centreX: number;
  centreY: number;
  desc: Matrix;
  descUp: Matrix;
  descDown: Matrix;
  descLeft: Matrix;
  descRight: Matrix;
  height: number;
  name: string;
  width: number;
  orientation: Direction;
  x: number;
  y: number;
}

export interface BlockDescription {
  desc: Matrix;
  name?: string;
}

export interface Board {
  width: number;
  height: number;
  desc: Uint8Array;
}

export type BooleanFunction = (...args: any[]) => boolean;

export interface Board1 extends Board {
  descBuffer: Uint8Array; 
}

export interface Dictionary<T> {
  [id: string]: T;
}

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

export interface FunctionsCollection<T extends Function> {
  default(): T;
  get(name: string): T;
  list(): string;
  register(name: string, func: T): void;
}

export interface MapBaseConfig {
  width?: number;
  height?: number;
  depth?: number;
}

export interface NextBlockConfig extends MapBaseConfig {
  blockDescriptions?: BlockDescription[];
  createBlock?: (desc: Matrix, x?: number, y?: number, name?: string) => Block;
  preview?: number;
  seedRandom?: string;
  randomMethod?: RandomMethod;
  seed?: string;
  spawn?: (boardWidth: number,
           boardHeight: number,
           block: Block) => Block;
}

export interface GameConfig extends NextBlockConfig {
  board?: Uint8Array;
  debug?: boolean;
  canMoveUp?: (board: Board, block: Block) => boolean;
  canMoveDown?: (board: Board, block: Block) => boolean;
  canMoveLeft?: (board: Board, block: Block) => boolean;
  canMoveRight?: (board: Board, block: Block) => boolean;
  canRotateLeft?: (board: Board, block: Block) => boolean;
  canRotateRight?: (board: Board, block: Block) => boolean;
  checkForLoss?: (board: Board, block: Block) => boolean;
  clearDelay?: number;
  connectedBlocks?: number;
  createBoard?: (width: number, height: number) => Board;
  detectAndClear?: string;
  dropOnUp?: boolean;
  enableShadow?: boolean;
  forceBufferUpdateOnClear?: boolean;
  name?: string;
  baseLevelScore?: number;
  tileScoreMultiplier?: number;
  nextLevelMultiplier?: number;
  speed?: number;
  speedMultiplier?: number;
  tick?: (game, delta: number) =>  any;
}

export type Matrix = Array<number[]>;

export type SeedRandom = (seed: string, ...args: any[]) => () => number;

export type RandomMethod = 'randomFromSet' | 'random';

export type SignedTypedArray = Int8Array | Int16Array | Int32Array;
export type UnsignedTypedArray = Uint8Array | Uint16Array | Uint32Array;
export type TypedArray = UnsignedTypedArray | SignedTypedArray;

export interface GameState {
  activePiece: Block;
  buffer: TypedArray;
  cascadeCount: number;
  conf: GameConfig;
  isEnded: boolean;
  isClearDelay: boolean;
  level: number;
  levelPrev: number;
  nextLevelThreshold: number;
  rowsCleared: number;
  rowsClearedPrev: number;
  score: number;
  tilesCleared: number;
  tilesClearedPrev: number;
}

export interface GameControls {
  endGame(): void;
  moveDown(): void;
  moveLeft(): void;
  moveRight(): void;
  moveUp(): void;
  rotateLeft(): void;
  rotateRight(): void;
}

export interface Game {
  state: GameState;
  controls: GameControls;
  addBlock(
    board: Board,
    block: Block,
    buffer: TypedArray,
    addShadow: boolean
  ): any;
  board: Board;
  clearCheck(markOffset?: number): number;
  clearNonSolids(): void;
  detectAndClear: (markOffset?: number) => number;
  emit: <T>(channel: string, payload?: T) => any;
  gameOver: () => any;
  gravityDrop: () => any;
  moveBlock(axis: 'x' | 'y', quantity: number): any;
  newBlock: () => any;
  nextBlock: () => Block;
  tick: (delta: number) => any;
}
