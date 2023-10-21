class Polygon {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    isAABBCollisionWithEdges = (other) => {
        const otherLeft = other.x - other.width / 2;
        const otherRight = other.x + other.width / 2;
        const otherTop = other.y - other.height / 2;
        const otherBottom = other.y + other.height / 2;

        return (
            this.x + this.width / 2 > otherLeft &&
            this.x - this.width / 2 < otherRight &&
            this.y + this.height / 2 > otherTop &&
            this.y - this.height / 2 < otherBottom
        );
    }


    isAABBCollisionWithSegment = (segment) => {
        const x1 = segment[0].x;
        const y1 = segment[0].y;
        const x2 = segment[1].x;
        const y2 = segment[1].y;

        const carLeft = this.x - this.width / 2;
        const carRight = this.x + this.width / 2;
        const carTop = this.y - this.height / 2;
        const carBottom = this.y + this.height / 2;

        return (
            carRight >= Math.min(x1, x2) &&
            carLeft <= Math.max(x1, x2) &&
            carBottom >= Math.min(y1, y2) &&
            carTop <= Math.max(y1, y2)
        );
    }

    // Function to check collision with road segments (line segments)
    isCollidingWithRoad(roadSegments) {
        for (const segment of roadSegments) {
            if (this.isAABBCollisionWithSegment(segment)) {
                return true;
            }
        }
        return false;
    }

    // Function to check collision with other polygons
    isCollidingWithPolygons = (otherPolygons) => {
        for (const polygon of otherPolygons) {
            if (this.isAABBCollision(polygon)) {
                // Handle collision with the polygon
            }
        }
    }

    setPos = (x, y) => {
        this.x = x;
        this.y = y;
    }

    draw = (ctx, color) => {
        ctx.beginPath()
        ctx.fillStyle = color;
        ctx.rect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );

        ctx.fill();
    }
}


