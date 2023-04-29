import { drawner } from "../Drawner";

type IDirection = "-y" | "+y" | "-x" | "+x";

export default class Player {
  private _x: number;
  private _y: number;
  private _direction: IDirection;
  private blockSize: number;
  private colisorColor: string;
  private _leftKeyPressed: boolean;
  private _rightKeyPressed: boolean;
  private _topKeyPressed: boolean;
  private _downKeyPressed: boolean;
  private _speedXL: number;
  private _speedXR: number;
  private _speedYT: number;
  private _speedYD: number;
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
    this._rightKeyPressed = false;
    this._leftKeyPressed = false;
    this._topKeyPressed = false;
    this._downKeyPressed = false;
    this._speedXL = 0;
    this._speedXR = 0;
    this._speedYT = 0;
    this._speedYD = 0;
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

  private updateSpeed(): void {
    this._speedXL = this._leftKeyPressed ? -this._perPixel : 0;
    this._speedXR = this._rightKeyPressed ? this._perPixel : 0;
    this._speedYT = this._topKeyPressed ? -this._perPixel : 0;
    this._speedYD = this._downKeyPressed ? this._perPixel : 0;
  }

  public render(): void {
    this.drawColisionRect();
    this.tempRenderEventRadar();
  }

  public moveProgress(): void {
    this.updateSpeed();
    // CHECK X
    this._x += this._speedXL;
    if (this.checkColision()) {
      this._x -= this._speedXL;
    } else {
      this._x += this._speedXR;
      if (this.checkColision()) {
        this._x -= this._speedXR;
      }
    }
    // CHECK Y
    this._y += this._speedYT;
    if (this.checkColision()) {
      this._y -= this._speedYT;
    } else {
      this._y += this._speedYD;
      if (this.checkColision()) {
        this._y -= this._speedYD;
      }
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

  public resetSpeedXL(): void {
    this._leftKeyPressed = false;
    if (this._rightKeyPressed) {
      this.toRight();
    }
    if (this._topKeyPressed) {
      this.toTop();
    }
    if (this._downKeyPressed) {
      this.toDown();
    }
  }

  public resetSpeedXR(): void {
    this._rightKeyPressed = false;
    if (this._leftKeyPressed) {
      this.toLeft();
    }
    if (this._topKeyPressed) {
      this.toTop();
    }
    if (this._downKeyPressed) {
      this.toDown();
    }
  }

  public resetSpeedYT(): void {
    this._topKeyPressed = false;
    if (this._downKeyPressed) {
      this.toDown();
    }
    if (this._leftKeyPressed) {
      this.toLeft();
    }
    if (this._rightKeyPressed) {
      this.toRight();
    }
  }

  public resetSpeedYD(): void {
    this._downKeyPressed = false;
    if (this._topKeyPressed) {
      this.toTop();
    }
    if (this._leftKeyPressed) {
      this.toLeft();
    }
    if (this._rightKeyPressed) {
      this.toRight();
    }
  }

  public toLeft(): void {
    this._direction = this._rightKeyPressed ? this._direction : "-x";
    this._leftKeyPressed = true;
    console.log(["esquerda", this._direction]);
  }

  public toRight(): void {
    this._direction = this._leftKeyPressed ? this._direction : "+x";
    this._rightKeyPressed = true;
    console.log(["direita", this._direction]);
  }

  public toTop(): void {
    this._direction = this._downKeyPressed ? this._direction : "-y";
    this._topKeyPressed = true;
    console.log(["cima", this._direction]);
  }

  public toDown(): void {
    this._direction = this._topKeyPressed ? this._direction : "+y";
    this._downKeyPressed = true;
    console.log(["baixo", this._direction]);
  }
}
