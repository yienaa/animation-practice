const canvas = document.querySelector('canvas')

const feGaussianBlur = document.querySelector('feGaussianBlur');
const feColorMatrix = document.querySelector('feColorMatrix');

const ctx = canvas.getContext('2d');
// style, canvas size 동일하게
const dpr = window.devicePixelRatio;

let width;
let height;
let particles;
let particalCount = 30;

function init() {
    width = innerWidth;
    height = innerHeight;
    particalCount = innerWidth / 30;
    
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    particles = [];
    for(let i = 0; i < particalCount ; i++) {
        const x = randomBetween(0, width);
        const y = randomBetween(0, height);
        const radius = randomBetween(50 , 100);
        const vy = randomBetween(1 , 5);
        particles.push(new Particle(x, y, radius, vy));
    }
}


const controller = new function () {
    this.blurValue = 100;
    this.alphaChannel = 100;
    this.alphaOffeset = -25;
    this.acc = 1.03;
}

let gui = new dat.GUI();
const gooey = gui.addFolder('Gooey Effects');
gooey.open();
gooey.add(controller, 'blurValue', 0, 100).onChange((value) => {
    feGaussianBlur.setAttribute('stdDeviation', value);
});

gooey.add(controller, 'alphaChannel', 1, 200).onChange((value) => {
    feColorMatrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${value} ${controller.alphaOffeset}`);
});

gooey.add(controller, 'alphaOffeset', -40, 40).onChange((value) => {
    feColorMatrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controller.alphaChannel} ${value}`);
});

const velocity = gui.addFolder('Velocity');
velocity.open();
velocity.add(controller, 'acc', 1, 1.5, 0.01).onChange((value) => {
   particles.forEach((particle) => particle.acc = value);
});


class Particle {
    constructor(x, y, radius, vy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vy = vy;
        this.acc = 1.03;
    }

    update() {
        this.y *= this.acc;
        this.y += this.vy;
    }

    draw() {
        // ctx.fillRect(10, 10, 50, 50);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360);
        ctx.fillStyle = 'red';
        ctx.fill();
        // ctx.stroke();
        ctx.closePath();
    }
}

// x 를 1px 이동시키기

let interval = 1000 / 60;
let now, delta;
let then = Date.now();

const x  = 100;
const y = 100;
const radius = 50;
const particle = new Particle(x, y, radius);


function randomBetween(min, max) {
    return Math.random() * (max - min + 1) + min;
}


function animate() {
    window.requestAnimationFrame(animate);

    now = Date.now();
    delta = now - then;

    if (delta < interval) return;
 
    ctx.clearRect(0, 0, width, height);
  
    particles.forEach((particle) => {
        particle.update();
        particle.draw();

        if (particle.y - particle.radius > height) {
            particle.radius = randomBetween(50 , 100);
            particle.x = randomBetween(0, width);
            particle.y = -particle.radius;
            particle.vy = randomBetween(1 , 5);
        }

    });

    then = now - (delta % interval);
}

window.addEventListener('load', () => {
    init();
    animate();
});

window.addEventListener('resize', () => {
    init();
});

