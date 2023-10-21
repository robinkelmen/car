class Vector2D {
    constructor(x1, y1, x2, y2) {
        this.v1 = { x: x1, y: y1 };
        this.v2 = { x: x2, y: y2 };
    }

    getV1() {
        return this.v1;
    }

    getV2() {
        return this.v2;
    }

    setV1(x, y) {
        this.v1 = { x, y };
    }

    setV2(x, y) {
        this.v2 = { x, y };
    }

    magnitude(vector) {
        const { x, y } = vector;
        return Math.sqrt(x * x + y * y);
    }

    distanceBetweenVectors() {
        return this.magnitude(this.v2) - this.magnitude(this.v1);
    }

    toString() {
        return `Vector 1: (${this.v1.x}, ${this.v1.y}), Vector 2: (${this.v2.x}, ${this.v2.y})`;
    }
}


