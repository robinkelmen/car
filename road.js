class Road {






    constructor(x, y, width, height, lanes = 3) {

        this.x = x;
        this.y = -1000000;
        this.width = width;
        this.height = 10000000;
        this.lanes = lanes;
        this.borders = [];
        this.borders = this.calculateDefaultBorders();

    }

    calculateDefaultBorders = () => {
        const leftBorder = [
            { x: this.x, y: this.y },
            { x: this.x, y: this.y + this.height }
        ];

        const rightBorder = [
            { x: this.x + this.width, y: this.y },
            { x: this.x + this.width, y: this.y + this.height }
        ];

        return [leftBorder, rightBorder];
    }


    addCustomBorder = (border) => {
        this.borders.push(border);
    }


    getLaneCenter = (idx) => {
        const laneWidth = this.width / this.lanes;

        if (idx > this.lanes) {
            console.log("out of bounds");
            return;
        }

        return this.x + laneWidth / 2 + (Math.min(idx, this.lanes - 1) * laneWidth);
    }

    draw = (ctx) => {

        ctx.fillStyle = 'lightgrey';



        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = "white"
        ctx.lineWidth = 5;
        ctx.fill();
        ctx.stroke();

        this.makeLanes(ctx);
    }

    makeLanes = (ctx) => {

        const laneWidth = this.width / this.lanes;

        for (let i = 1; i < this.lanes; i++) {


            ctx.strokeStyle = "white";
            ctx.lineWidth = 5;

            ctx.setLineDash([30, 30]);
            ctx.beginPath();
            ctx.moveTo((i * laneWidth) + this.x, this.y);
            ctx.lineTo((i * laneWidth) + this.x, this.height);
            ctx.stroke();
            ctx.setLineDash([]);

        }

    }
}