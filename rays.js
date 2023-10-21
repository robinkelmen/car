class Rays {



    constructor(car, raycount = 3) {
        this.car = car;
        this.rayCount = raycount;
        this.rayLength = 150;
        this.raySpread = Math.PI / 2;
        this.rays = [];
        this.intersectionPoints = [];
        this.pointRays();

    }

    checkEdges = (roadBorders) => {

        this.intersectionPoints = [];


        for (let i = 0; i < this.rayCount; i++) {

            const ray = this.rays[i];

            roadBorders.forEach(border => {

                const point = checkIntersection(
                    ray[0].x,
                    ray[0].y,
                    ray[1].x,
                    ray[1].y,
                    border[0].x,
                    border[0].y,
                    border[1].x,
                    border[1].y
                );


                if (point) {

                    this.intersectionPoints.push(point);
                }

            });


        }

    }
    update = (roadBorders) => {
        this.pointRays();
        this.checkEdges(roadBorders);

    }

    pointRays = () => {
        this.rays = [];

        for (let i = 0; i < this.rayCount; i++) {
            const start = { x: this.car.x, y: this.car.y };

            const angle = lerp(
                this.raySpread / 2,
                -this.raySpread / 2,
                i / (this.rayCount - 1)

            ) + this.car.angle

            const end = {
                x: this.car.x - Math.sin(angle) * this.rayLength,
                y: this.car.y - Math.cos(angle) * this.rayLength
            }

            this.rays.push([start, end]);

        }
    }

    drawIntersections = (points, ctx) => {

        points.forEach(point => {
            ctx.strokeStyle = "lightgreen";
            ctx.beginPath();
            ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
            ctx.stroke();
        })
    }

    draw = (ctx) => {


        //this.update();



        for (let i = 0; i < this.rayCount; i++) {
            const ray = this.rays[i];
            ctx.beginPath();
            ctx.strokeStyle = "yellow";
            ctx.moveTo(ray[0].x, ray[0].y);
            ctx.lineTo(ray[1].x, ray[1].y);
            ctx.stroke();
        }
        this.drawIntersections(this.intersectionPoints, ctx);


    }
}