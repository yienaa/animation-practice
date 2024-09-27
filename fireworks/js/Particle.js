import CanvasOption from "./CanvasOption.js";

export default class Particle extends CanvasOption {
  constructor(x, y, vx, vy, opacity, colorDegree) {
    super();
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.opacity = opacity;
    this.gravity = 0.1;
    this.friction = 0.93;
    this.colorDegree = colorDegree;
  }

  update() {
    this.vy *= this.friction;
    this.vx *= this.friction;

    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.opacity -= 0.01;
  }

  draw() {
    this.ctx.fillStyle = `hsla(${this.colorDegree}, 100%, 65%, ${this.opacity})`;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
