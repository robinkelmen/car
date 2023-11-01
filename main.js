// JavaScript code for interacting with the canvas

const width = 400;
const height = window.innerHeight;

const canvas = document.getElementById("myCanvas");
canvas.width = width;
canvas.height = height;



const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 600;
networkCanvas.height = window.innerHeight;

const ctx = canvas.getContext("2d", { willReadFrequently: true });
const networkCtx = networkCanvas.getContext("2d");


// You can start drawing on the canvas here
ctx.fillStyle = "lightblue";


const numLanes = 3;


const road = new Road(canvas.width / 2, 0, 200, window.innerHeight, numLanes);
const car = new Car(road.getLaneCenter(1), 100, 40, 60, "KEYS", 3);
const vision = new Vision(canvas, car);

const traffic = new Array(5).fill(null).map(
    () => {

        const randomLane = Math.floor(Math.random() * numLanes);
        const randomPosY = Math.floor(Math.random() * -600);
        return new Car(road.getLaneCenter(randomLane), randomPosY, 40, 60, "DUMMY", 1);
    }
);

const network = new Network(10, 4, 2, [8, 6]);

//console.log(network);

// Create some example input data (should have 20 elements for your network)
const input = [1, 1, 0.1, 0.2, 0.6, 0.1, 0.9, 0.1, 1, 1]
// Call the feedForward method with the input data

//const out1 = network.layers[0].feedForward(input);
const output = network.feedForward(input);

console.log("Network Output:");
console.log(output);

const networkVis = new NetworkVisualizer(networkCtx, network);





function drawNetwork() {


    // Clear the network canvas
    //networkCtx.clearRect(0, 0, networkCanvas.width, networkCanvas.height);

    // Define your drawing logic for the network here
    // For example, draw the layers and connections
    // You can use network-related data from your existing code
    // and draw it on the network canvas
}


animate();

function animate() {

    //drawNetwork();
    canvas.height = window.innerHeight;
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.7);


    road.draw(ctx);

    traffic.forEach((tCar) => {
        tCar.update(road.borders);
        tCar.draw(ctx);
    })

    car.update(road.borders, traffic);
    car.draw(ctx);

    networkVis.drawNetwork();


    ctx.restore();
    vision.update();
    updateStats();
    window.requestAnimationFrame(animate);

}

function updateStats() {
    const carStatsDiv = document.getElementById("car-stats");
    const carX = document.getElementById("car-x");
    const carY = document.getElementById("car-y");
    const carAngle = document.getElementById("car-angle");
    const carDamage = document.getElementById("car-damage");
    const carOrientation = document.getElementById("car-orientation");

    const angleDeg = car.angle * (180 / Math.PI).toFixed(2);

    const angle360 = convertTo360Degrees(angleDeg);

    carX.textContent = car.x.toFixed(2);
    carY.textContent = car.y.toFixed(2);
    carAngle.textContent = (angle360 + "°"); // Convert radians to degrees
    carDamage.textContent = car.maxHealth - car.health;

    let orientation = determineOrientation(angle360);


    carOrientation.textContent = orientation.orientation;






}


