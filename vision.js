class Vision {


    constructor(canvas, car) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d', { willReadFrequently: true });

        this.car = car;


        this.snapshotWidth = 150; // Adjust to the desired width
        this.snapshotHeight = 150; // Adjust to the desired height

        this.visionPolygon = null;


    }

    drawSight = (x, y, color) => {
        this.ctx.save();
        ctx.globalAlpha = 0.2;
        this.ctx.translate(x, y);
        this.ctx.rotate(-this.car.angle);
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.rect(
            -this.snapshotWidth / 2,
            -this.snapshotHeight,
            this.snapshotWidth,
            this.snapshotHeight
        );

        ctx.fill();
        ctx.globalAlpha = 1.0;
        this.ctx.restore();
    }


    takeSnapshot() {
        const { x: carX, y: carY, width: carWidth, height: carHeight, angle } = this.car;
        const angleDeg = (angle * 180 / Math.PI).toFixed(2);
        const angle360 = convertTo360Degrees(angleDeg);
        const orientation = determineOrientation(angle360);
        const carFrontY = orientation.flip === -1 ? carY + carHeight / 2 : carY - carHeight / 2;
        const snapshotX = carX;
        const snapshotY = carFrontY - carY + canvas.height * 0.7;

        // Draw a green sight to visualize the snapshot position
        this.drawSight(snapshotX, snapshotY, 'green');

        // Get the image data of the snapshot from the canvas
        const snapshot = this.ctx.getImageData(snapshotX, snapshotY, -this.snapshotWidth / 2, -this.snapshotHeight);

        // Create a temporary canvas to manipulate the snapshot
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.snapshotWidth;
        tempCanvas.height = this.snapshotHeight;
        const tempCtx = tempCanvas.getContext('2d');

        // Translate and rotate the temporary canvas to align with the car's orientation
        tempCtx.translate(snapshotX, snapshotY);
        tempCtx.rotate(-angle);

        // Draw the car snapshot on the temporary canvas
        tempCtx.drawImage(this.canvas, -this.snapshotWidth, -this.snapshotHeight);

        // Get the final image data of the car snapshot
        return tempCtx.getImageData(-this.snapshotWidth / 2, -this.snapshotHeight, this.snapshotWidth, this.snapshotHeight);
    }








    saveSnapshotToFile() {
        const snapshot = this.takeSnapshot();

        if (snapshot) {
            // Create a new canvas to display and save the snapshot
            const snapshotCanvas = document.createElement('canvas');
            snapshotCanvas.width = this.snapshotWidth;
            snapshotCanvas.height = this.snapshotHeight;
            const snapshotCtx = snapshotCanvas.getContext('2d');
            snapshotCtx.putImageData(snapshot, 0, 0);

            // Convert the canvas to a data URL
            const dataURL = snapshotCanvas.toDataURL('image/png');

            // Create a link to download the image
            const a = document.createElement('a');
            a.href = dataURL;
            a.download = 'snapshot.png';

            // Trigger a click event on the link to initiate the download
            a.click();
        }
    }
    displaySnapshot(snapshot) {
        const snapshotImage = document.getElementById('snapshot-image');
        snapshotImage.src = this.snapshotToDataURL(snapshot);
    }

    snapshotToDataURL(snapshot) {
        const snapshotCanvas = document.createElement('canvas');
        snapshotCanvas.width = this.snapshotWidth;
        snapshotCanvas.height = this.snapshotHeight;
        const snapshotCtx = snapshotCanvas.getContext('2d');
        snapshotCtx.putImageData(snapshot, 0, 0);
        return snapshotCanvas.toDataURL('image/png');
    }



    update() {
        const snapshot = this.takeSnapshot();
        //console.log(snapshot);
        if (snapshot) {
            this.displaySnapshot(snapshot);
        }
    }



}