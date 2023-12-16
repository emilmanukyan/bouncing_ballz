import { Vector } from './vector.ts';
import { canvas } from './main.ts';
import { context } from './main.ts';

export const ballImg = document.createElement('img');
ballImg.src = '../images/basketball.png';

export class Ball {
    position: Vector;
    velocity: Vector;
    radius: number;
    rotation: number;
    acc: Vector = new Vector(0, 0);

    constructor({
        position,
        radius,
        rotation,
    }: {
        position: Vector;
        radius: number;
        rotation: number;
    }) {
        this.position = position;
        this.velocity = new Vector(0, 0);
        this.radius = radius;
        this.rotation = rotation;
    }

    get size() {
        return this.radius * 2;
    }

    update() {
        const acc = new Vector(0, 0);
        acc.add(new Vector(0, 0.9))
        this.velocity.add(acc);
        this.position.add(this.velocity);
        const diffVertical = this.position.y - (canvas.height - this.size);
		const diffHorizontal = this.position.x - (canvas.width - this.size);
        if(diffVertical > 0) {
            this.velocity.mult(new Vector(-0.7, -0.7));
            this.position.y -= diffVertical;
        }

		if(diffHorizontal >= 0)
			this.position.x -= diffHorizontal;
		else if(this.position.x < 0)
			this.position.x = 0;
        
		const isBouncing = this.position.y < canvas.height - this.size;
        if (isBouncing) {
            this.rotation += 0.1;
        }
    }

    draw() {
        context.save();
        context.translate(
            this.position.x + this.radius,
            this.position.y + this.radius
        );
        context.rotate(this.rotation);
        context.drawImage(
            ballImg,
            -this.radius,
            -this.radius,
            this.size,
            this.size
        );
        context.restore();
    }

	// Newton's 3rd law tells us that for every action 
	// there is an equal and opposite reaction.

    interact(otherBall: Ball) {
        const distance = Vector.sub(this.position, otherBall.position);
        if (distance.length <= this.radius + otherBall.radius) {
             const angle = distance.angle;
             const thisSpeed = this.velocity.length;
             const otherSpeed = otherBall.velocity.length;

             const thisDirection = Math.atan2(this.velocity.y, this.velocity.x);
             const otherDirection = Math.atan2(
                 otherBall.velocity.y,
                 otherBall.velocity.x
             );

             this.velocity.x = otherSpeed * Math.cos(otherDirection);
             this.velocity.y = otherSpeed * Math.sin(otherDirection);

             otherBall.velocity.x = thisSpeed * Math.cos(thisDirection);
             otherBall.velocity.y = thisSpeed * Math.sin(thisDirection);

             const overlap = this.radius + otherBall.radius - distance.length;
             this.position.x += Math.cos(angle) * (overlap / 2);
             this.position.y += Math.sin(angle) * (overlap / 2);
             otherBall.position.x -= Math.cos(angle) * (overlap / 2);
             otherBall.position.y -= Math.sin(angle) * (overlap / 2);
        }
    }
}
