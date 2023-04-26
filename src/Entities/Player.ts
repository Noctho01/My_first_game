import { drawner } from "../Drawner";

export default class Player {
  private _x: number;
  private _y: number;
  private blockSize: number;
  private colisionColor: string;
  private _speed: number;
  private _colisionMap: string[][];

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

  get speed(): number {
    return this._speed;
  }

  set colisionMap(value: string[][]) {
    this._colisionMap = value;
  }

  constructor(blockSize: number, color: string, perSpeed: number) {
    this.colisionColor = color;
    this.blockSize = blockSize;
    this._speed = blockSize / perSpeed;
    this._x = blockSize;
    this._y = blockSize;
  }

  public render(): void {
    this.drawColisionRect();
  }

  public checkColision(): boolean {
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

  private drawColisionRect(): void {
    drawner.drawRect(this.colisionColor, this.x, this.y, this.blockSize, this.blockSize);
  }

  public toLeft(): void {
    this._x = this._x - this.speed;
    if (this.checkColision()) {
      this._x = this._x + this.speed;
    }
  }

  public toRight(): void {
    this._x = this._x + this.speed;
    if (this.checkColision()) {
      this._x = this._x - this.speed;
    }
  }

  public toTop(): void {
    this._y = this._y - this.speed;
    if (this.checkColision()) {
      this._y = this._y + this.speed;
    }
  }

  public toDown(): void {
    this._y = this._y + this.speed;
    if (this.checkColision()) {
      this._y = this._y - this.speed;
    }
  }
}
