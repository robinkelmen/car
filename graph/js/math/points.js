class Point {


    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    equals = (point) => {
        console.log("finding equals:", point)
        console.log("eq: ", this.x == point.x && this.y == point.y)
        return this.x == point.x && this.y == point.y;
    }


    draw = (ctx, { size = 15, color = "black", outline = false, fill = false } = {}) => {

        const radius = size / 2;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
        ctx.fill();

        if (outline) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.arc(this.x, this.y, radius * 0.7, 0, 2 * Math.PI);
            ctx.stroke();
        }

        if (fill) {
            ctx.beginPath();
            ctx.fillStyle = "yellow";
            ctx.arc(this.x, this.y, radius * 0.4, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}