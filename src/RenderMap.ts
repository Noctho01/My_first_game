import { drawner } from "./Drawner";
import { getRandomNumber } from "./Helpers/getRandomNumber";

export class RenderMap {
  private wall_top_index: number;
  private wall_down_index: number;

  constructor(
    readonly blockSize: number,
    readonly map: {
      view: string[][];
      colision: string[][];
      event: string[][];
    },
    readonly assets: {
      wall_pontas: CanvasImageSource[];
      wall_top: CanvasImageSource[];
      wall_down: CanvasImageSource[];
      wall_all_left: CanvasImageSource[];
      wall_all_right: CanvasImageSource[];
      wall_all_down: CanvasImageSource[];
    }
  ) {
    this.wall_top_index = getRandomNumber(0, this.assets.wall_top.length);
    this.wall_down_index = getRandomNumber(0, this.assets.wall_down.length);
  }

  private drawImage(image: CanvasImageSource, x: number, y: number): void {
    drawner.drawImage(image, x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
  }

  public colisionCheck(mobX: number, mobY: number): boolean {
    const rectX = parseInt((mobX / this.blockSize).toString());
    const rectY = parseInt((mobY / this.blockSize).toString());
    const value = this.map.colision[rectY][rectX];
    if (value === "1") {
      if (mobX >= rectX && mobX <= rectX) {
        return true;
      }
    }
    return false;
  }

  public renderColision(): void {
    this.map.colision.forEach((xArray, indexY) => {
      xArray.forEach((value, indexX) => {
        if (value === "1") {
          drawner.drawStrok("red", indexX * this.blockSize, indexY * this.blockSize, this.blockSize, this.blockSize);
        }
      });
    });
  }

  public render(): void {
    this.map.view.forEach((xArray, indexY) => {
      xArray.forEach((value, indexX) => {
        switch (value) {
          case "0":
            this.drawImage(this.assets.wall_pontas[0], indexX, indexY);
            break;
          case "1":
            this.drawImage(this.assets.wall_top[this.wall_top_index], indexX, indexY);
            break;
          case "2":
            this.drawImage(this.assets.wall_down[this.wall_down_index], indexX, indexY);
            break;
          case "3":
            this.drawImage(this.assets.wall_all_left[0], indexX, indexY);
            break;
          case "4":
            this.drawImage(this.assets.wall_all_right[0], indexX, indexY);
            break;
          case "5":
            this.drawImage(this.assets.wall_all_down[0], indexX, indexY);
            break;
          case "x":
            drawner.drawStrok("gray", indexX * this.blockSize, indexY * this.blockSize, this.blockSize, this.blockSize);
            break;
          case "h":
            drawner.drawStrok("green", indexX * this.blockSize, indexY * this.blockSize, this.blockSize, this.blockSize);
            break;
          case "g":
            drawner.drawRect("black", indexX * this.blockSize, indexY * this.blockSize, this.blockSize, this.blockSize);
            break;
        }
      });
    });
  }
}
