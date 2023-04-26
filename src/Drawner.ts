class Drawner {
  private canvas = <HTMLCanvasElement>document.getElementById("canvas");
  private ctx: CanvasRenderingContext2D = this.canvas.getContext("2d");

  get height(): number {
    return this.canvas.height;
  }

  get width(): number {
    return this.canvas.width;
  }

  constructor() {}

  public drawImage(image: CanvasImageSource, x: number, y: number, w: number, h: number): void {
    this.ctx.beginPath();
    this.ctx.drawImage(image, x, y, w, h);
    this.ctx.closePath();
  }

  public drawStrok(color: string, x: number, y: number, w: number, h: number): void {
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.strokeRect(x, y, w, h);
    this.ctx.closePath();
  }

  public drawRect(color: string, x: number, y: number, w: number, h: number): void {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
    this.ctx.closePath();
  }

  public clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export const drawner = new Drawner();
