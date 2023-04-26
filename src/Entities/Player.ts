import { drawner } from "../Drawner";

type IDirection = "-y" | "+y" | "-x" | "+x";

export default class Player {
  private _x: number;
  private _y: number;
  private _direction: IDirection;
  private blockSize: number;
  private colisorColor: string;
  private _speedXL: number;
  private _speedXR: number;
  private _speedYT: number;
  private _speedYB: number;
  private _perPixel: number;
  private _colisionMap: string[][];
  private _eventMap: string[][];

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get xMap(): number {
    return parseInt((this._x / this.blockSize).toString());
  }

  get yMap(): number {
    return parseInt((this._y / this.blockSize).toString());
  }

  get xRMap(): number {
    return parseInt(((this._x + 0.9 * this.blockSize) / this.blockSize).toString());
  }

  get yRMap(): number {
    return parseInt(((this._y + 0.9 * this.blockSize) / this.blockSize).toString());
  }

  get direction(): IDirection {
    return this._direction;
  }

  get eventRadarPosition(): { x: number; y: number; xMap: number; yMap: number; xRMap: number; yRMap: number; w: number; h: number } {
    const tmp = { x: 0, y: 0, xMap: 0, yMap: 0, xRMap: 0, yRMap: 0, w: 0, h: 0 };
    switch (this.direction) {
      case "-y":
        tmp.w = this.blockSize / 10;
        tmp.h = 1;
        tmp.x = this.x + this.blockSize / 1.9 - tmp.w;
        tmp.y = this.y - 1;
        break;
      case "+y":
        tmp.w = this.blockSize / 10;
        tmp.h = 1;
        tmp.x = this.x + this.blockSize / 1.9 - tmp.w;
        tmp.y = this.y + this.blockSize;
        break;
      case "-x":
        tmp.w = 1;
        tmp.h = this.blockSize / 10;
        tmp.x = this.x - 1;
        tmp.y = this.y + this.blockSize / 1.9 - tmp.h;
        break;
      case "+x":
        tmp.w = 1;
        tmp.h = this.blockSize / 10;
        tmp.x = this.x + this.blockSize;
        tmp.y = this.y + this.blockSize / 1.9 - tmp.h;
        break;
    }
    tmp.xMap = parseInt((tmp.x / this.blockSize).toString());
    tmp.yMap = parseInt((tmp.y / this.blockSize).toString());
    tmp.xRMap = parseInt(((tmp.x + 0.9 * tmp.w) / this.blockSize).toString());
    tmp.yRMap = parseInt(((tmp.y + 0.9 * tmp.h) / this.blockSize).toString());
    return tmp;
  }

  set colisionMap(value: string[][]) {
    this._colisionMap = value;
  }

  set eventMap(value: string[][]) {
    this._eventMap = value;
  }

  constructor(blockSize: number, color: string, perPixel: number) {
    this.colisorColor = color;
    this.blockSize = blockSize;
    this._perPixel = perPixel;
    this._speedXR = 0;
    this._speedXL = 0;
    this._speedYT = 0;
    this._speedYB = 0;
    this._x = blockSize;
    this._y = blockSize;
    this._direction = "+y";
  }

  private checkColision(): boolean {
    if (
      this._colisionMap[this.yMap][this.xMap] == "1" ||
      this._colisionMap[this.yRMap][this.xMap] == "1" ||
      this._colisionMap[this.yMap][this.xRMap] == "1" ||
      this._colisionMap[this.yRMap][this.xRMap] == "1"
    ) {
      return true;
    }
    return false;
  }

  private checkEventColision(): string {
    const a = this._eventMap[this.eventRadarPosition.yMap][this.eventRadarPosition.xMap];
    const b = this._eventMap[this.eventRadarPosition.yRMap][this.eventRadarPosition.xRMap];
    return a != "0" ? a : b;
  }

  private drawColisionRect(): void {
    drawner.drawRect(this.colisorColor, this.x, this.y, this.blockSize, this.blockSize);
  }

  private tempRenderEventRadar(): void {
    drawner.drawStrok("red", this.eventRadarPosition.x, this.eventRadarPosition.y, this.eventRadarPosition.w, this.eventRadarPosition.h);
  }

  public render(): void {
    this.drawColisionRect();
    this.tempRenderEventRadar();
  }

  public moveProgress(): void {
    this._x += this._speedXR;
    this._x += this._speedXL;
    this._y += this._speedYT;
    this._y += this._speedYB;
    if (this.checkColision()) {
      this._x -= this._speedXR;
      this._x -= this._speedXL;
      this._y -= this._speedYT;
      this._y -= this._speedYB;
    }
  }

  public interative(): void {
    switch (this.checkEventColision()) {
      case "1":
        console.log("AEEE!!");
        break;
      default:
        console.log("NADA!");
        break;
    }
  }

  public resetSpeedXR(): void {
    this._direction = "-x";
    this._speedXR = 0;
  }

  public resetSpeedXL(): void {
    this._direction = "+x";
    this._speedXL = 0;
  }

  public resetSpeedYT(): void {
    this._direction = "+y";
    this._speedYT = 0;
  }

  public resetSpeedYB(): void {
    this._direction = "-y";
    this._speedYB = 0;
  }

  public toLeft(): void {
    this._direction = "-x";
    this._speedXL = -this._perPixel;
  }

  public toRight(): void {
    this._direction = "+x";
    this._speedXR = this._perPixel;
  }

  public toTop(): void {
    console.log("aqui");
    this._direction = "-y";
    this._speedYT = -this._perPixel;
  }

  public toDown(): void {
    this._direction = "+y";
    this._speedYB = this._perPixel;
  }
}
