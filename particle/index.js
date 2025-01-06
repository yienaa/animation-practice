import Particle from "./js/Particle.js";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio;
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;
const interval = 1000 / 60;
const particles = [];

function init() {
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;
  console.log(canvasWidth)

  canvas.style.width = canvasWidth + 'px';
  canvas.style.height = canvasHeight + 'px';
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr);
}

function createParicleRing(particleNum = 20) {
  for (let i = 0; i < particleNum; i++){
    particles.push(new Particle());
  }
  console.log(particles);
  
}

function render() {
  let now, delta;
  let then = Date.now();

  const frame = () => {
    requestAnimationFrame(frame);
    now = Date.noew();
    delta = now - then;
    if (delta < interval) return;
    
    particles.forEach((particle, index) => {
      particle.update();
      particle.draw(ctx);
    })
    then = now - (delta % interval)
  }
}

window.addEventListener('load', () => {
  init();
  render();
})

window.addEventListener('resize', () => {
  init();
})

window.addEventListener('click', () => {
  createParicleRing();
})