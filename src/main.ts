import './style.css';
import { Vector } from './vector.ts';
import { Ball } from './ball.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <canvas width="1200" height="600"></canvas>
  </div>
`;

const canvas = document.querySelector('canvas')!;
const context = canvas.getContext('2d')!;

const bgImg = document.createElement('img');
bgImg.src = '../images/background.jpg';

const balls: Ball[] = [];

canvas.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    balls.push(
        new Ball({
            position: new Vector(x, y),
            radius: 30,
            rotation: 0,
            canvas: canvas,
            context: context,
        })
    );
});

function update() {
    for(const ball of balls) {
        ball.update();
        for (const otherBall of balls) {
            if (otherBall !== ball) {
                ball.interact(otherBall);
            }
        }
    }
}

function draw() {
    context.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    for (const ball of balls) {
        ball.draw();
    }
}

function tick() {
    update();
    draw();

    requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
