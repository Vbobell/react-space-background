import { Star } from "../model";

export enum ACTION {
  INIT = "INIT",
  FILL_STARS = "FILL_STARS",
  RENDER_STARS = "RENDER_STARS",
  SET_CANVAS_DIMENSIONS = "SET_CANVAS_DIMENSIONS",
  ERROR = "ERROR",
}

export interface SpaceBackground {
  fps?: number;
  numStars?: number;
  innerWidth?: number;
  innerHeight?: number;
  stars?: Star[];
  canvas?: HTMLCanvasElement;
}

export interface DISPATCH {
  type?: ACTION;
  state?: SpaceBackground;
}

export interface CanvasDimensions {
  width: string | number;
  height: string | number;
}

export interface Canvas extends CanvasDimensions {
  canvas: HTMLCanvasElement;
}
