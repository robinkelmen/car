class NetworkVisualizer {




    constructor(ctx, network) {
        this.ctx = ctx;
        this.network = network;

        this.margin = 50;
        this.left = this.margin;
        this.top = this.margin;
        this.width = ctx.canvas.width - this.margin * 2;
        this.height = ctx.canvas.height - this.margin * 2;

        this.levelHeight = this.height / this.network.layers.length;

        //this.drawNetwork();
    }

    drawNetwork = () => {

        // console.log("drawing Network")

        for (let i = 0; i < this.network.layers.length; i++) {
            this.drawLevel(
                this.network.layers[i],
                i
            );
        }
    }



    drawLevel = (level, levelIdx) => {


        const top = this.top + this.levelHeight * levelIdx;
        const bottom = top + this.levelHeight;
        const rightEnd = this.width + this.margin;
        let outputXPositions = [];
        let inputXPositions = [];
        //draw outputs at top
        // draw inputs at bottom,
        // draw weights to each node

        for (let i = 0; i < level.inputLength; i++) {

            const x = lerp(
                this.left,
                rightEnd,
                i / (level.inputLength)
            );

            inputXPositions.push(x);

            const brightness = level.inputs[i];

            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.strokeStyle = "yellow";
            this.ctx.arc(x, top, 10, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.restore();

            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.fillStyle = `rgb(${Math.floor(brightness * 255)}, ${Math.floor(brightness * 255)}, 0)`; // Adjust the color based on brightness
            this.ctx.arc(x, top, 10, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();



        }

        for (let i = 0; i < level.outputLength; i++) {

            const x = lerp(
                this.left,
                rightEnd,
                i / (level.outputLength)
            );

            outputXPositions.push(x);

            if (levelIdx == this.network.layers.length - 1) {

                const brightness = level.outputs[i];
                this.ctx.beginPath();
                this.ctx.fillStyle = `rgb(${Math.floor(brightness * 255)}, ${Math.floor(brightness * 255)}, 0)`;
                this.ctx.arc(x, bottom, 10, 0, Math.PI * 2);
                this.ctx.fill();

            }



        }

        for (let i = 0; i < inputXPositions.length; i++) {


            outputXPositions.forEach((pos, j) => {

                const weight = level.weights[j][i];


                const brightness = Math.abs(255 - 255 * weight);

                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.lineWidth = 2;
                this.ctx.strokeStyle = `rgba(${brightness}, ${brightness}, 0, 1)`; // Adjust the color and transparency based on weight
                this.ctx.moveTo(inputXPositions[i], top);
                this.ctx.lineTo(pos, bottom);
                this.ctx.stroke();
                this.ctx.restore();

            })


        }


    }



}