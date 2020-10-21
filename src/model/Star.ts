export class Star {
  private x: number;
  private y: number;
  private opacity: number;
  private canvas: HTMLCanvasElement;
  private length: number;
  private factor: number;
  private increment: number;

  constructor(
    x: number,
    y: number,
    opacity: number,
    canvas: HTMLCanvasElement
  ) {
    this.x = x;
    this.y = y;
    this.opacity = opacity;
    this.canvas = canvas;
    this.length = Math.floor(Math.random() * 2) + 1;
    this.factor = 1;
    this.increment = Math.random() * 0.03;
  }

  draw() {
    let ctx = this.canvas.getContext("2d");

    if (this.opacity > 1) {
      this.factor = -1;
    } else if (this.opacity <= 0) {
      this.factor = 1;
    }

    this.opacity += this.increment * this.factor;

    if (ctx) {
      ctx.beginPath();
      ctx.fillRect(this.x, this.y, this.length, this.length);
      ctx.closePath();

      ctx.fillStyle = "rgba(255, 255, 255, 1)";

      ctx.fill();

      ctx.restore();
    }
  }
}

export default Star;
