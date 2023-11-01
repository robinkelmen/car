class Car {




    constructor(x, y, width, height, controlType = "KEYS", maxSpeed = 3) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;


        this.maxSpeed = maxSpeed;
        this.acc = 0.2;
        this.speed = 0;
        this.friction = 0.05;
        this.angle = 0;

        this.maxHealth = 5;
        this.health = this.maxHealth;
        this.healthDecrement = 1;

        this.isColliding = false; // Track collision state


        this.carColor = "red";



        this.controls = new Controls(controlType);


        if (controlType == "KEYS") {
            this.rays = new Rays(this, 10);
        }
        this.carPolygon = new Polygon(x, y, width, height);





    }
    drawWheels = (ctx) => {
        const wheelWidth = this.width * 0.2; // Adjust the width of the wheels
        const wheelLength = this.height * 0.3; // Adjust the length of the wheels

        // Calculate the distances of the wheels from the center of the car
        const wheelDistX = this.width / 2; // Adjusted to move the wheels inside the car body
        const wheelDistY = this.height / 4 + wheelLength / 2; // Adjusted to position the front wheels below the car's top edge

        // Define the positions of the wheels relative to the car's center
        const wheelPositions = [
            { label: 'rearLeft', x: -wheelDistX, y: wheelDistY },
            { label: 'rearRight', x: wheelDistX, y: wheelDistY },
            { label: 'frontLeft', x: -wheelDistX, y: -wheelDistY },
            { label: 'frontRight', x: wheelDistX, y: -wheelDistY }
        ];

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle); // Rotate the entire car based on the car's angle
        ctx.fillStyle = "black";

        // Draw each wheel at its respective position
        for (const position of wheelPositions) {
            ctx.save();
            ctx.translate(position.x, position.y);
            if (position.label === 'frontRight' || position.label === 'frontLeft') {

                const turnAngle = 0.2;
                const dir = this.controls;

                var flip = 0;

                if (dir.left) {
                    flip = -1;
                }
                if (dir.right) {
                    flip = 1;
                }
                ctx.rotate(flip * turnAngle);
            }
            ctx.beginPath();
            ctx.rect(-wheelWidth / 2, -wheelLength / 2, wheelWidth, wheelLength);
            ctx.fill();
            ctx.restore();
        }

        ctx.restore();
    }




    draw = (ctx) => {

        if (this.rays) {
            this.rays.draw(ctx);
        }

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);

        this.carPolygon.draw(ctx, this.carColor);
        ctx.restore();



        this.drawWheels(ctx);

    }


    update = (roadBorders, traffic = []) => {

        if (this.rays) {
            this.rays.update(roadBorders, traffic);
        }

        if (this.health > 0) {
            this.move();
        }

        this.checkBorderCollision(roadBorders, traffic);







    }
    checkCarCollision = () => {


    }

    checkBorderCollision = (roadBorders, otherCars = []) => {
        const isColliding = this.carPolygon.isCollidingWithRoad(roadBorders) ||
            this.carPolygon.isCollidingWithPolygons(otherCars);

        if (isColliding && !this.isColliding) {
            this.isColliding = true; // Set collision flag
            this.health -= this.healthDecrement; // Decrement health once on initial collision
            this.adjustCarColor(); // Adjust the car color based on health
        } else if (!isColliding) {
            this.isColliding = false; // Reset collision flag when no longer colliding

        }
    }

    move = () => {

        if (this.controls.forward) {
            console.log("forward")
            this.speed += this.acc;


        }
        if (this.controls.back) {
            this.speed -= this.acc;
        }
        if (this.controls.left) {
            this.angle += 0.03;

        }
        if (this.controls.right) {
            this.angle -= 0.03;

        }

        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed < -this.maxSpeed) {
            this.speed = -this.maxSpeed / 2;
        }


        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }

        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;

        this.carPolygon.setPos(this.x, this.y);


    }



    adjustCarColor = () => {
        // Calculate a new color based on health using linear interpolation
        const minColor = [255, 0, 0]; // Initial color (red)
        const maxColor = [10, 10, 10]; // Final color (dark gray, almost black)

        console.log("Health: ", this.health);
        if (this.health < 0) {
            this.health = 0;
        }
        // Calculate the new color based on health (lerp)
        const t = this.health / this.maxHealth;
        const newColor = minColor.map((min, i) =>
            Math.round(lerp(maxColor[i], min, t))
        );

        this.carColor = `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`;
    }




}