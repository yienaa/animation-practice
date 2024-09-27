import CanvasOption from "./CanvasOption.js"
import { randomNumBetween } from "./Utils.js";

export default class Tail extends CanvasOption {
    constructor(x, vy, colorDegree) {
        super();
        this.x = x;
        this.y = this.canvasHeight;
        this.vy = vy;
        this.colorDegree = colorDegree;
        this.angle = randomNumBetween(0, 2);
        this.friction = 0.985;
    }

    update() {
        this.vy *= this.friction; 
        this.y  += this.vy;

        this.angle += 1;
        this.x += Math.cos(this.angle) * this.vy * 0.2;
        this.opacity = -this.vy * 0.1;
    }

    draw() {
        this.ctx.fillStyle = `hsla(${this.colorDegree}, 100%, 65%, ${this.opacity})`;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }
}