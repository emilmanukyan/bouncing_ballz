export class Vector {
    constructor(public x: number, public y: number) {}
    get length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    get angle() {
        return Math.atan2(this.y, this.x);
    }
    add(v: Vector) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    sub(v: Vector) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    mult(v:Vector) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }
    static sub(v1: Vector, v2: Vector) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }
    static copy(v: Vector) {
        return new Vector(v.x, v.y);
    }
}
