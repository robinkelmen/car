// JavaScript code for interacting with the canvas
const canvas = document.getElementById("myCanvas");

const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext("2d");

// You can start drawing on the canvas here
ctx.fillStyle = "lightblue";
ctx.fillRect(0, 0, canvas.width, canvas.height);



const road = new Road(canvas.width / 2, 0, 200, window.innerHeight, 3);
const car = new Car(road.getLaneCenter(1), 100, 40, 60);



animate();

function animate() {

    canvas.height = window.innerHeight;
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.7);


    road.draw(ctx);

    car.update(road.borders);
    car.draw(ctx);


    ctx.restore();
    window.requestAnimationFrame(animate);

}


